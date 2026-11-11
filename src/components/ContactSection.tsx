import { useState, type FormEvent } from "react";
import { PixelButton } from "@/components/PixelButton";
import { Reveal } from "@/components/Reveal";
import { SECTION_SHELL_CLASS, SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/projects";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

const inputClass =
  "min-h-11 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ContactSection() {
  const [emailDraftUrl, setEmailDraftUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const emailInput = form.elements.namedItem("email");

    if (!name || !email || !message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      setError("Please shorten one or more fields and try again.");
      return;
    }
    if (emailInput instanceof HTMLInputElement && !emailInput.validity.valid) {
      setError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    setEmailDraftUrl(
      `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <section id="contact" className={SECTION_SHELL_CLASS}>
      <Reveal>
        <div className="max-w-2xl">
          <SectionHeading id="contact-heading" eyebrow="Contact" title="Let's talk" />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            I'm currently open to new opportunities. Whether you have a question or just want to say
            hi, I'll try my best to get back to you. You can also reach me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="font-medium text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {profile.email}
            </a>
            .
          </p>

          {emailDraftUrl && (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 pixel-step-sm border border-primary/50 bg-primary/5 p-5"
            >
              <p className="font-semibold">Your email draft is ready.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Nothing has been sent. Your email app will open the message, and you'll need to
                press Send there.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <PixelButton href={emailDraftUrl}>Open email draft</PixelButton>
                <PixelButton type="button" variant="outline" onClick={() => setEmailDraftUrl(null)}>
                  Edit message
                </PixelButton>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            hidden={Boolean(emailDraftUrl)}
            className="mt-8 space-y-4 pixel-step border border-border bg-card p-5 shadow-sm sm:p-8"
          >
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                maxLength={MAX_NAME_LENGTH}
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                maxLength={MAX_EMAIL_LENGTH}
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={MAX_MESSAGE_LENGTH}
                rows={5}
                className={`${inputClass} resize-y`}
                placeholder="How can I help?"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Up to {MAX_MESSAGE_LENGTH} characters.
              </p>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="pt-2">
              <PixelButton type="submit">Prepare email</PixelButton>
            </div>
          </form>
        </div>
      </Reveal>

    </section>
  );
}
