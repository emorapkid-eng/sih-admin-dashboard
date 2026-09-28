import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/sunglasses")({
  head: () => categoryHead("sunglasses", "See the difference — SIH WEARS sunglasses."),
  component: () => <CategoryPage slug="sunglasses" />,
});
