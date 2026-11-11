import { createFileRoute } from "@tanstack/react-router";
import { handlePortfolioChat } from "@/server/portfolio-chat";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) => handlePortfolioChat(request),
      GET: () =>
        Response.json(
          { error: "Method not allowed." },
          { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
        ),
    },
  },
});
