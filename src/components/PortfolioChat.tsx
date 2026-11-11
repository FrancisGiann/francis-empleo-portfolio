import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Send, Square } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProject, profile } from "@/data/projects";
import {
  MAX_CHAT_MESSAGE_LENGTH,
  createBoundedChatRequest,
  validateChatInput,
  welcomeMessage,
  type ChatLink,
  type ChatMessage,
  type ChatPrompt,
} from "@/lib/portfolio-chat";
import { useRetroMode } from "@/hooks/use-retro-mode";
import portrait from "@/assets/portrait.jpg";

type ReplyMode = "ai" | "portfolio" | "unavailable";
type ReplyPayload = {
  mode: ReplyMode;
  text: string;
  links: ChatLink[];
  prompts: ChatPrompt[];
  notice?: string;
  retryable: boolean;
};

const MAX_VISIBLE_MESSAGES = 24;
const CLIENT_TIMEOUT_MS = 23_000;
const generalPrompts: ChatPrompt[] = [
  { label: "About Francis", question: "Can you tell me about yourself?" },
  { label: "Projects", question: "What projects have you worked on?" },
  { label: "Skills", question: "What skills do you have?" },
];

function newMessage(
  role: ChatMessage["role"],
  text: string,
  extra: Partial<ChatMessage> = {},
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    links: [],
    prompts: [],
    retryable: false,
    ...extra,
  };
}

function isReplyPayload(value: unknown): value is ReplyPayload {
  if (!value || typeof value !== "object") return false;
  const reply = value as Record<string, unknown>;
  return (
    (reply["mode"] === "ai" || reply["mode"] === "portfolio" || reply["mode"] === "unavailable") &&
    typeof reply["text"] === "string" &&
    reply["text"].length > 0 &&
    reply["text"].length <= 4000 &&
    Array.isArray(reply["links"]) &&
    Array.isArray(reply["prompts"]) &&
    typeof reply["retryable"] === "boolean" &&
    (reply["notice"] === undefined ||
      (typeof reply["notice"] === "string" && reply["notice"].length <= 240))
  );
}

function safeLinks(links: unknown): ChatLink[] {
  if (!Array.isArray(links)) return [];
  const safe: ChatLink[] = [];
  for (const value of links) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const link = value as Record<string, unknown>;
    if (
      typeof link["label"] !== "string" ||
      link["label"].length === 0 ||
      link["label"].length > 100
    )
      continue;
    if (typeof link["projectId"] === "string" && getProject(link["projectId"])) {
      safe.push({ label: link["label"], projectId: link["projectId"] });
      continue;
    }
    const href = link["href"];
    if (
      typeof href === "string" &&
      (href === `mailto:${profile.email}` ||
        href === profile.github ||
        href === profile.linkedin ||
        href === "/#about")
    ) {
      safe.push({ label: link["label"], href });
    }
  }
  return safe;
}

function safePrompts(prompts: unknown): ChatPrompt[] {
  if (!Array.isArray(prompts)) return [];
  const safe: ChatPrompt[] = [];
  for (const value of prompts) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const prompt = value as Record<string, unknown>;
    const label = prompt["label"];
    const question = prompt["question"];
    if (
      typeof label === "string" &&
      label.length > 0 &&
      label.length <= 48 &&
      typeof question === "string" &&
      question.length > 0 &&
      question.length <= MAX_CHAT_MESSAGE_LENGTH
    ) {
      safe.push({ label, question });
    }
  }
  return safe;
}

function appendToHistory(previous: ChatMessage[], message: ChatMessage) {
  return [...previous, message].slice(-MAX_VISIBLE_MESSAGES);
}

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [lastReplyMode, setLastReplyMode] = useState<ReplyMode | null>(null);
  const [notice, setNotice] = useState("");
  const [pendingQuestion, setPendingQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef(0);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { enabled: retro } = useRetroMode();
  const routeProjectId = useMemo(() => {
    const match = /^\/projects\/([^/]+)$/.exec(pathname);
    const id = match?.[1];
    return id && getProject(id) ? id : undefined;
  }, [pathname]);

  useEffect(() => {
    const scrollToLatest = () => {
      const transcript = transcriptRef.current;
      if (transcript) transcript.scrollTop = transcript.scrollHeight;
    };
    scrollToLatest();
    let frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(scrollToLatest);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, isPending, open]);

  useEffect(
    () => () => {
      activeRequestIdRef.current += 1;
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
    },
    [],
  );

  function appendReply(reply: ReplyPayload) {
    setLastReplyMode(reply.mode);
    setNotice(reply.notice ?? "");
    setMessages((previous) =>
      appendToHistory(
        previous,
        newMessage("assistant", reply.text, {
          links: safeLinks(reply.links),
          prompts: safePrompts(reply.prompts),
          retryable: reply.retryable,
        }),
      ),
    );
  }

  async function sendQuestion(rawQuestion: string, retry = false) {
    if (activeControllerRef.current) return;
    const validation = validateChatInput(rawQuestion);
    if (!validation.ok) {
      setError(
        validation.reason === "empty"
          ? "Write a question before sending."
          : `Keep your message under ${MAX_CHAT_MESSAGE_LENGTH + 1} characters.`,
      );
      textareaRef.current?.focus();
      return;
    }

    setError("");
    setNotice("");
    const question = validation.value;
    const userMessage = retry
      ? [...messages].reverse().find((message) => message.role === "user")
      : newMessage("user", question);
    if (!userMessage) return;

    if (!retry) {
      setDraft("");
      setMessages((previous) => appendToHistory(previous, userMessage));
    } else {
      setMessages((previous) => {
        const last = previous.at(-1);
        return last?.role === "assistant" && last.retryable ? previous.slice(0, -1) : previous;
      });
    }
    setPendingQuestion(question);
    setIsPending(true);

    const context = messages.filter((message) => message.id !== "welcome");
    if (retry && context.at(-1)?.role === "assistant" && context.at(-1)?.retryable) context.pop();
    if (!retry) context.push(userMessage);
    const requestBody = createBoundedChatRequest(context, routeProjectId);

    const controller = new AbortController();
    const requestId = activeRequestIdRef.current + 1;
    activeRequestIdRef.current = requestId;
    activeControllerRef.current = controller;
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, CLIENT_TIMEOUT_MS);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
        signal: controller.signal,
      });
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        throw new Error("The chat server returned an unreadable response.");
      }
      if (requestId !== activeRequestIdRef.current) return;
      if (!response.ok) {
        const serverError =
          payload &&
          typeof payload === "object" &&
          typeof (payload as { error?: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "Chat could not reach the AI service. Please try again.";
        setError(serverError);
        setNotice("No message was sent to Francis.");
        setLastReplyMode("unavailable");
        setMessages((previous) =>
          appendToHistory(
            previous,
            newMessage("assistant", serverError, { retryable: true, prompts: generalPrompts }),
          ),
        );
        return;
      }
      if (!isReplyPayload(payload)) throw new Error("The chat server returned an invalid reply.");
      appendReply({
        ...payload,
        links: safeLinks(payload.links),
        prompts: safePrompts(payload.prompts),
      });
    } catch (caught) {
      if (requestId !== activeRequestIdRef.current) return;
      if (caught instanceof DOMException && caught.name === "AbortError") {
        appendReply({
          mode: "unavailable",
          text: timedOut
            ? "That response took too long. Please try again."
            : "I stopped the response. You can retry when you're ready.",
          links: [],
          prompts: generalPrompts,
          notice: timedOut
            ? "The request timed out. No message was sent to Francis."
            : "No message was sent to Francis.",
          retryable: true,
        });
        return;
      }
      const message =
        caught instanceof Error
          ? caught.message
          : "Chat is temporarily unavailable. Please try again.";
      setError(message);
      appendReply({
        mode: "unavailable",
        text: "I couldn't complete that response. Please try again.",
        links: [],
        prompts: generalPrompts,
        notice: "No message was sent to Francis.",
        retryable: true,
      });
    } finally {
      window.clearTimeout(timeout);
      if (requestId === activeRequestIdRef.current) {
        activeControllerRef.current = null;
        setIsPending(false);
        setPendingQuestion("");
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(draft);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.nativeEvent.keyCode !== 229
    ) {
      event.preventDefault();
      void sendQuestion(draft);
    }
  }

  function stopResponse() {
    const controller = activeControllerRef.current;
    if (!controller) return;
    activeRequestIdRef.current += 1;
    activeControllerRef.current = null;
    controller.abort();
    setIsPending(false);
    setPendingQuestion("");
    appendReply({
      mode: "unavailable",
      text: "I stopped the response. You can retry when you're ready.",
      links: [],
      prompts: generalPrompts,
      notice: "No message was sent to Francis.",
      retryable: true,
    });
  }

  function resetConversation() {
    activeRequestIdRef.current += 1;
    activeControllerRef.current?.abort();
    activeControllerRef.current = null;
    setMessages([welcomeMessage]);
    setDraft("");
    setError("");
    setNotice("");
    setLastReplyMode(null);
    setIsPending(false);
    setPendingQuestion("");
    textareaRef.current?.focus();
  }

  const modeLabel =
    lastReplyMode === "ai"
      ? "Gemini reply"
      : lastReplyMode === "portfolio"
        ? "Portfolio answer"
        : lastReplyMode === "unavailable"
          ? "Live replies unavailable"
          : null;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Chat with Francis's AI portfolio assistant"
            className={`fixed bottom-4 right-4 z-40 inline-flex min-h-11 items-center gap-2 border border-primary bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${retro ? "pixel-step-sm" : "rounded-md"}`}
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Chat with Francis
          </button>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            textareaRef.current?.focus();
          }}
          className={`fixed left-auto top-auto right-4 bottom-4 flex h-[min(44rem,calc(100dvh-2rem))] w-[min(28rem,calc(100vw-2rem))] translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border border-border bg-background p-0 shadow-2xl duration-200 [&>button:last-child]:right-3 [&>button:last-child]:top-3 [&>button:last-child]:z-10 [&>button:last-child]:flex [&>button:last-child]:h-11 [&>button:last-child]:w-11 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:rounded-md [&>button:last-child]:border [&>button:last-child]:border-border [&>button:last-child]:bg-background [&>button:last-child]:opacity-100 [&>button:last-child]:focus-visible:ring-2 [&>button:last-child]:focus-visible:ring-inset [&>button:last-child]:focus-visible:ring-ring ${retro ? "pixel-step" : "rounded-xl"}`}
        >
          <DialogHeader className="shrink-0 border-b border-border bg-card px-4 py-3 pr-16 text-left sm:px-5">
            <div className="flex min-h-11 items-center gap-3">
              <img
                src={portrait}
                alt=""
                className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
                width={44}
                height={44}
              />
              <div className="min-w-0">
                <DialogTitle className="truncate font-heading text-base font-bold">
                  {profile.name}
                </DialogTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">AI assistant · Gemini</p>
              </div>
              <button
                type="button"
                onClick={resetConversation}
                aria-label="Reset chat"
                title="Reset chat"
                className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw aria-hidden className="h-3.5 w-3.5" />
              </button>
            </div>
            <DialogDescription className="sr-only">
              AI assistant powered by Gemini. Open the chat information for message handling
              details.
            </DialogDescription>
            <details className="mt-2 text-xs leading-relaxed text-muted-foreground">
              <summary className="min-h-8 cursor-pointer py-1 font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                How this chat works
              </summary>
              <p className="max-w-prose pb-1">
                Live replies are processed by Google. On the free tier, messages may be used to
                improve Google's products. Nothing is sent to Francis.{" "}
                <a
                  href="https://ai.google.dev/gemini-api/docs/pricing#gemini-3.1-flash-lite"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Details
                </a>
              </p>
            </details>
            {modeLabel && (
              <span className="mt-1 inline-flex min-h-6 w-fit items-center border border-primary/30 bg-primary/5 px-2 text-[11px] font-medium text-primary">
                {modeLabel}
              </span>
            )}
          </DialogHeader>

          <div
            ref={transcriptRef}
            role="log"
            aria-label="Chat conversation"
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
          >
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <article
                  aria-label={
                    message.role === "user" ? "Your message" : "Portfolio assistant reply"
                  }
                  className={`max-w-[90%] space-y-3 px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? `bg-primary text-primary-foreground ${retro ? "pixel-step-sm" : "rounded-xl rounded-br-sm"}`
                      : `border border-border bg-card text-card-foreground ${retro ? "pixel-step-sm" : "rounded-xl rounded-bl-sm"}`
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  {message.role === "assistant" && message.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-t border-border/70 pt-3">
                      {message.links.map((link) =>
                        link.projectId && getProject(link.projectId) ? (
                          <Link
                            key={`${link.label}-${link.projectId}`}
                            to="/projects/$projectId"
                            params={{ projectId: link.projectId }}
                            viewTransition={{ types: ["route"] }}
                            onClick={() => setOpen(false)}
                            className="inline-flex min-h-11 items-center border border-primary/40 px-3 text-xs font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {link.label}
                          </Link>
                        ) : link.href === "/#about" ? (
                          <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex min-h-11 items-center border border-primary/40 px-3 text-xs font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {link.label}
                          </a>
                        ) : link.href ? (
                          <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            target={link.href.startsWith("https:") ? "_blank" : undefined}
                            rel={link.href.startsWith("https:") ? "noreferrer" : undefined}
                            className="inline-flex min-h-11 items-center border border-primary/40 px-3 text-xs font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {link.label}
                          </a>
                        ) : null,
                      )}
                    </div>
                  )}
                  {message.role === "assistant" &&
                    index === messages.length - 1 &&
                    message.retryable && (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          const previousUser = messages
                            .slice(0, index)
                            .reverse()
                            .find((item) => item.role === "user");
                          if (previousUser) void sendQuestion(previousUser.text, true);
                        }}
                        className="inline-flex min-h-11 items-center gap-2 border border-border px-3 text-xs font-medium text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                      >
                        <RotateCcw aria-hidden className="h-3.5 w-3.5" />
                        Try again
                      </button>
                    )}
                  {message.role === "assistant" &&
                    index === messages.length - 1 &&
                    message.prompts.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {message.prompts.map((prompt) => (
                          <button
                            key={`${prompt.label}-${prompt.question}`}
                            type="button"
                            disabled={isPending}
                            onClick={() => void sendQuestion(prompt.question)}
                            className="inline-flex min-h-11 items-center border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                          >
                            {prompt.label}
                          </button>
                        ))}
                      </div>
                    )}
                </article>
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start" role="status" aria-live="polite">
                <div className="max-w-[90%] border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse bg-primary" aria-hidden />
                    Preparing a reply…
                  </span>
                </div>
              </div>
            )}
            <div aria-hidden className="h-px" />
          </div>

          <div className="shrink-0 border-t border-border bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-5">
            {notice && (
              <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{notice}</p>
            )}
            {error && (
              <p role="alert" className="mb-2 text-xs leading-relaxed text-destructive">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="portfolio-chat-composer" className="sr-only">
                Your question
              </label>
              <textarea
                ref={textareaRef}
                id="portfolio-chat-composer"
                value={draft}
                onChange={(event) => {
                  setDraft(event.currentTarget.value);
                  if (error) setError("");
                }}
                onKeyDown={handleComposerKeyDown}
                maxLength={MAX_CHAT_MESSAGE_LENGTH}
                rows={2}
                placeholder="Ask about me or my work…"
                className="min-h-11 max-h-32 min-w-0 flex-1 resize-y border border-input bg-background px-3 py-2 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-describedby="portfolio-chat-hint"
                disabled={isPending}
              />
              {isPending ? (
                <button
                  type="button"
                  onClick={stopResponse}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Stop reply to: ${pendingQuestion}`}
                >
                  <Square aria-hidden className="h-4 w-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-primary bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send question"
                >
                  <Send aria-hidden className="h-4 w-4" />
                </button>
              )}
            </form>
            <div
              id="portfolio-chat-hint"
              className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground"
            >
              <span>Enter to send · Shift+Enter for a new line</span>
              <span>
                {draft.length}/{MAX_CHAT_MESSAGE_LENGTH}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
