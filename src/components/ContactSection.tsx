import { PixelButton } from "@/components/PixelButton";
import { profile } from "@/data/projects";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-pixel text-xl uppercase tracking-widest text-primary mb-4">
          Let's Connect
        </h2>
        <p className="mb-8 text-muted-foreground">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <form
          action="https://formspree.io/f/placeholder" // TODO: Add real formspree endpoint or emailjs here
          method="POST"
          className="text-left space-y-4 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
              placeholder="How can I help you?"
            ></textarea>
          </div>
          <div className="pt-2 flex justify-center">
            <PixelButton type="submit">
              Send Message
            </PixelButton>
          </div>
        </form>
      </div>
    </section>
  );
}
