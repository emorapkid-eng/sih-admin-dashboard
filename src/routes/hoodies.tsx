import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/hoodies")({
  head: () => categoryHead("hoodies", "Heavyweight heritage hoodies — SIH WEARS hoodies."),
  component: () => <CategoryPage slug="hoodies" />,
});
