import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/gadgets")({
  head: () => categoryHead("gadgets", "Smart choices, better living — SIH WEARS gadgets."),
  component: () => <CategoryPage slug="gadgets" />,
});
