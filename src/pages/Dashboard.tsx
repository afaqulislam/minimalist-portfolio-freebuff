import { useQuery } from "convex/react";
import { format } from "date-fns";
import { Inbox as InboxIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const messages = useQuery(api.messages.list);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
        {/* Header */}
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Signed in as {user?.name || user?.email || "owner"}
            </p>
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Inbox
            </h1>
            <p className="text-sm text-muted-foreground">
              Messages sent through the contact form on your portfolio.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer rounded-none self-center sm:w-fit"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        {/* Messages */}
        <div className="mt-12">
          {messages === undefined ? (
            <div className="flex items-center justify-center gap-2 py-16 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
              Loading messages…
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-border bg-card px-6 py-16 text-center sm:px-10">
              <InboxIcon className="size-6 text-muted-foreground" />
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-lg font-medium tracking-tight">
                  No messages yet
                </h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                  When someone submits the contact form on your portfolio,
                  their inquiry will appear here — and land in your inbox by
                  email.
                </p>
              </div>
              <a
                href="/#contact"
                className="text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                View your contact section
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-border border-t border-border">
              {messages.map((message) => (
                <li key={message._id} className="py-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium">
                      {message.name}
                      {message.company ? (
                        <span className="text-muted-foreground">
                          {" "}
                          · {message.company}
                        </span>
                      ) : null}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {format(message.createdAt, "MMM d, yyyy · h:mm a")}
                    </p>
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="mt-1 inline-block break-all text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {message.email}
                  </a>
                  <p className="mx-auto mt-4 max-w-2xl whitespace-pre-wrap text-sm leading-6 text-foreground/85">
                    {message.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
