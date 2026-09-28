import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/shirts")({
  head: () => categoryHead("shirts", "Classic fits, modern looks — SIH WEARS shirts."),
  component: () => <CategoryPage slug="shirts" />,
});
