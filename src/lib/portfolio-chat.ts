import { getProject, nowItems, profile, projects, skillGroups } from "@/data/projects";

export const MAX_CHAT_MESSAGE_LENGTH = 1000;
export const MAX_CHAT_REQUEST_BYTES = 18 * 1024;
const MAX_CHAT_HISTORY_MESSAGES = 12;

export type ChatPrompt = { label: string; question: string };
export type ChatLink = { label: string; projectId?: string; href?: string };
export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  links: ChatLink[];
  prompts: ChatPrompt[];
  retryable: boolean;
};

export type ChatRequestMessage = { role: "assistant" | "user"; content: string };

export function createBoundedChatRequest(
  messages: readonly Pick<ChatMessage, "role" | "text">[],
  projectId?: string,
) {
  const context: ChatRequestMessage[] = messages
    .slice(-MAX_CHAT_HISTORY_MESSAGES)
    .map(({ role, text }) => ({ role, content: text }));
  while (context[0]?.role === "assistant") context.shift();

  const body = () => ({
    messages: [...context],
    ...(projectId ? { projectId } : {}),
  });
  const encoder = new TextEncoder();
  let serialized = JSON.stringify(body());

  while (encoder.encode(serialized).byteLength > MAX_CHAT_REQUEST_BYTES && context.length > 1) {
    if (context[0]?.role === "user" && context[1]?.role === "assistant") {
      context.splice(0, 2);
    } else {
      context.shift();
    }
    serialized = JSON.stringify(body());
  }

  return serialized;
}

export type ChatValidation =
  { ok: true; value: string } | { ok: false; reason: "empty" | "too-long" };

export function validateChatInput(input: unknown): ChatValidation {
  const value = typeof input === "string" ? input.trim() : "";
  if (!value) return { ok: false, reason: "empty" };
  if (value.length > MAX_CHAT_MESSAGE_LENGTH) return { ok: false, reason: "too-long" };
  return { ok: true, value };
}

const generalPrompts: ChatPrompt[] = [
  { label: "About Francis", question: "Can you tell me about yourself?" },
  { label: "Projects", question: "What projects have you worked on?" },
  { label: "Skills", question: "What skills do you have?" },
];

const projectPrompts: ChatPrompt[] = [
  { label: "What's the stack?", question: "What stack did you use?" },
  { label: "What was challenging?", question: "What was the hardest part?" },
];

export const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Welcome. I enjoy building full-stack projects, from the backend logic to the interface. Ask me about my projects, skills, or what I'm working on.",
  links: [],
  prompts: generalPrompts,
  retryable: false,
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function hasAny(question: string, terms: string[]) {
  const paddedQuestion = ` ${question} `;
  return terms.some((term) => paddedQuestion.includes(` ${term} `));
}

export function resolveChatProjectId(question: string, currentProjectId?: string) {
  const normalized = normalize(question);
  const mentionedProject = findMentionedProject(normalized);
  if (mentionedProject) return mentionedProject.id;
  return currentProjectId && getProject(currentProjectId) ? currentProjectId : undefined;
}

export function resolveChatProjectIdFromHistory(
  messages: readonly Pick<ChatRequestMessage, "role" | "content">[],
  currentProjectId?: string,
) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const latestMention = latestUserMessage
    ? findMentionedProject(normalize(latestUserMessage.content))
    : undefined;
  if (latestMention) return latestMention.id;
  if (currentProjectId && getProject(currentProjectId)) return currentProjectId;

  for (const message of [...messages].reverse()) {
    if (message.role !== "user") continue;
    const mentioned = findMentionedProject(normalize(message.content));
    if (mentioned) return mentioned.id;
  }
  return undefined;
}

function findMentionedProject(question: string) {
  const catalogMatch = projects.find(
    ({ id, title }) =>
      hasAny(question, [normalize(id)]) ||
      (id !== "flow-typing-workspace" && hasAny(question, [normalize(title)])),
  );
  if (catalogMatch) return catalogMatch;
  if (hasAny(question, ["sevilla360", "sevilla 360"])) return getProject("sevilla360");
  if (
    question === "flow" ||
    hasAny(question, ["typing", "typing practice", "flow project", "flow app"]) ||
    (hasAny(question, ["flow"]) &&
      hasAny(question, [
        "what",
        "about",
        "project",
        "stack",
        "tech",
        "hardest",
        "challenging",
        "built",
        "made",
      ]))
  ) {
    return getProject("flow-typing-workspace");
  }
  return undefined;
}

function projectLink(projectId: string): ChatLink[] {
  const project = getProject(projectId);
  return project ? [{ label: `Read the ${project.title} case study`, projectId }] : [];
}

function contactLinks(): ChatLink[] {
  return [{ label: `Email ${profile.name.split(" ")[0]}`, href: `mailto:${profile.email}` }];
}

function projectReply(
  project: NonNullable<ReturnType<typeof getProject>>,
  intent: "overview" | "stack" | "challenge" | "outcome" | "contribution",
): ChatMessage {
  let answer: string;
  if (intent === "stack") {
    answer = `For ${project.title}, I used ${project.tech.join(", ")}.`;
  } else if (intent === "challenge") {
    const challenges = project.challenges?.slice(0, 2) ?? [];
    answer = challenges.length
      ? `A few challenges described in the ${project.title} case study are ${challenges.join(" ")}`
      : `I don't have challenge details for ${project.title} in this portfolio yet.`;
  } else if (intent === "outcome") {
    const outcomes = project.outcomes?.slice(0, 2) ?? [];
    answer = outcomes.length
      ? `The ${project.title} case-study draft describes these outcomes: ${outcomes.join(" ")}`
      : `I don't have outcome details for ${project.title} in this portfolio yet.`;
  } else if (intent === "contribution") {
    answer = `Francis's work on ${project.title} included ${project.contribution.charAt(0).toLowerCase()}${project.contribution.slice(1)}`;
  } else {
    answer = `${project.title}: ${project.description}`;
  }

  const statusNote = project.status === "wip" ? " I currently mark it as work in progress." : "";
  return {
    id: "",
    role: "assistant",
    text: `${answer}${statusNote} Case-study details are still drafts, so I treat them as qualitative rather than verified results.`,
    links: projectLink(project.id),
    prompts: projectPrompts,
    retryable: false,
  };
}

export function answerPortfolioQuestion(question: string, currentProjectId?: string): ChatMessage {
  const normalized = normalize(question);
  const mentionedProject = findMentionedProject(normalized);
  const currentProjectIdSafe =
    currentProjectId && getProject(currentProjectId) ? currentProjectId : undefined;
  const currentProject = currentProjectIdSafe ? getProject(currentProjectIdSafe) : undefined;
  const project = mentionedProject ?? currentProject;

  if (
    /^(hi|hello|hey|yo|howdy|good morning|good afternoon|good evening)( there)?$/.test(normalized)
  ) {
    return {
      ...welcomeMessage,
      id: "",
      text: "Hello. What would you like to know about my background or projects?",
    };
  }

  if (
    hasAny(normalized, [
      "who are you",
      "tell me about yourself",
      "about you",
      "about francis",
      "who is francis",
      "your name",
      "what do you do",
      "introduce yourself",
    ])
  ) {
    return {
      id: "",
      role: "assistant",
      text: `I'm ${profile.name}, a ${profile.role} and graduating IT student. I enjoy working across backend, APIs, and frontend, with a focus on making applications useful and easy to use.`,
      links: [{ label: "Read about me", href: "/#about" }],
      prompts: generalPrompts,
      retryable: false,
    };
  }

  if (hasAny(normalized, ["resume", "cv", "curriculum vitae"])) {
    return {
      ...welcomeMessage,
      id: "",
      text: "You can download Francis's résumé as a PDF.",
      links: [{ label: "Download résumé", href: profile.resumeHref }],
    };
  }

  if (
    !mentionedProject &&
    hasAny(normalized, [
      "email",
      "contact",
      "get in touch",
      "reach you",
      "reach out",
      "linkedin",
      "github",
    ])
  ) {
    return {
      id: "",
      role: "assistant",
      text: `You can email me at ${profile.email}, or find me on GitHub and LinkedIn. I can't send a message from this chat.`,
      links: [
        ...contactLinks(),
        { label: "GitHub", href: profile.github },
        { label: "LinkedIn", href: profile.linkedin },
      ],
      prompts: generalPrompts,
      retryable: false,
    };
  }

  if (
    !mentionedProject &&
    hasAny(normalized, [
      "salary",
      "rate",
      "rates",
      "availability",
      "available",
      "work preference",
      "remote",
      "hire",
      "hiring",
    ])
  ) {
    return {
      id: "",
      role: "assistant",
      text: `The contact section says I'm open to new opportunities, but it doesn't include a start date, rates, or salary details. Email me to discuss specifics.`,
      links: contactLinks(),
      prompts: generalPrompts,
      retryable: false,
    };
  }

  if (
    !mentionedProject &&
    hasAny(normalized, [
      "projects",
      "project list",
      "show me your work",
      "your work",
      "what have you built",
      "what did you build",
    ])
  ) {
    return {
      id: "",
      role: "assistant",
      text: `The projects featured here are ${projects.map((item) => item.title).join(", ")}.`,
      links: projects.map((item) => ({ label: item.title, projectId: item.id })),
      prompts: generalPrompts,
      retryable: false,
    };
  }

  const asksForSkills = hasAny(normalized, [
    "skills",
    "skill",
    "languages",
    "stack",
    "technology",
    "technologies",
    "tech",
    "your stack",
    "what tech do you know",
    "tools do you use",
  ]);
  const asksForProjectStack = hasAny(normalized, [
    "stack",
    "tech",
    "technology",
    "technologies",
    "built with",
    "which languages",
  ]);
  const asksForChallenge = hasAny(normalized, [
    "hardest",
    "challenging",
    "challenge",
    "difficult",
    "tricky",
  ]);
  const asksForOutcome = hasAny(normalized, ["outcome", "outcomes", "results", "result", "impact"]);
  const asksForContribution = hasAny(normalized, [
    "what did you do",
    "what did you build",
    "your role",
    "your contribution",
    "what did francis do",
  ]);
  const asksAboutProject = hasAny(normalized, [
    "what is it",
    "tell me more",
    "tell me about this project",
    "explain it",
    "describe it",
    "what does it do",
    "project details",
    "project overview",
  ]);

  if (
    project &&
    (asksForProjectStack ||
      asksForChallenge ||
      asksForOutcome ||
      asksForContribution ||
      asksAboutProject ||
      mentionedProject)
  ) {
    const intent = asksForProjectStack
      ? "stack"
      : asksForChallenge
        ? "challenge"
        : asksForOutcome
          ? "outcome"
          : asksForContribution
            ? "contribution"
            : "overview";
    return { ...projectReply(project, intent), id: "" };
  }

  if (asksForSkills) {
    const languages = skillGroups.find((group) => group.label === "Languages")?.skills ?? [];
    const frameworks = skillGroups.find((group) => group.label === "Frameworks")?.skills ?? [];
    const tools = skillGroups.find((group) => group.label === "Data & tools")?.skills ?? [];
    return {
      id: "",
      role: "assistant",
      text: `The portfolio lists ${languages.join(", ")}; ${frameworks.join(", ")}; and tools including ${tools.join(", ")}.`,
      links: [{ label: "See the skills section", href: "/#about" }],
      prompts: generalPrompts,
      retryable: false,
    };
  }

  if (hasAny(normalized, ["now", "currently", "learning", "building", "working on"])) {
    return {
      id: "",
      role: "assistant",
      text: nowItems.map((item) => `${item.label}: ${item.text}`).join(" "),
      links: [],
      prompts: generalPrompts,
      retryable: false,
    };
  }

  return {
    id: "",
    role: "assistant",
    text: "I can help with details listed here about me, my skills, projects, and contact links. I don't want to guess beyond what the portfolio says.",
    links: contactLinks(),
    prompts: generalPrompts,
    retryable: false,
  };
}
