import { useAction } from "convex/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass = "rounded-none bg-background";

export function ContactForm() {
  const sendMessage = useAction(api.sendMessage.sendMessage);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setError(null);

    try {
      const result = await sendMessage({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? "") || undefined,
        message: String(formData.get("message") ?? ""),
        // Honeypot field — bots that auto-fill hidden inputs get filtered out
        // server-side. Humans never see it, so a filled value means spam.
        website: String(formData.get("website") ?? ""),
        ownerEmail: profile.notifyEmail,
      });

      if (!result.success) {
        throw new Error("Something went wrong sending your message.");
      }

      setStatus("sent");
      form.reset();
      toast.success("Message sent", {
        description: result.emailNotified
          ? "Thanks — I'll get back to you within one business day."
          : "Thanks — your message has been received.",
      });
    } catch (err) {
      console.error("[ContactForm] Submit failed:", err);
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="mx-auto flex h-full min-h-72 w-full max-w-2xl flex-col items-center justify-between gap-8 rounded-none border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Your message has been sent.
        </p>
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-medium tracking-tight">
            Thanks for reaching out.
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            I read every inquiry personally and reply within one business day.
            For anything urgent, email me directly.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer rounded-none"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-full w-full max-w-2xl flex-col gap-6 rounded-none border border-border bg-card p-6 sm:p-8"
    >
      {/* Honeypot — hidden from humans, tempting for spam bots. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="Jane Doe"
            className={inputClass}
            disabled={status === "sending"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="jane@company.com"
            className={inputClass}
            disabled={status === "sending"}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-company"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Company <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>
        </label>
        <Input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={120}
          placeholder="Acme Inc."
          className={inputClass}
          disabled={status === "sending"}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          Project details
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder="Tell me about your project — SaaS build, AI feature, or something else entirely…"
          className={`${inputClass} min-h-36 flex-1 resize-none`}
          disabled={status === "sending"}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-col gap-3">
        <p className="text-center text-xs text-muted-foreground">
          Replies within 1 business day.
        </p>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full cursor-pointer rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
