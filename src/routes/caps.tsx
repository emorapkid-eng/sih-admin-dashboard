import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/caps")({
  head: () => categoryHead("caps", "Caps coming soon — SIH WEARS caps."),
  component: () => <CategoryPage slug="caps" />,
});
