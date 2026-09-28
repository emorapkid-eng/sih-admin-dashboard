import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/site/Shell";

export const Route = createFileRoute("/pants")({
  head: () => categoryHead("pants", "Comfort meets style — SIH WEARS pants."),
  component: () => <CategoryPage slug="pants" />,
});
