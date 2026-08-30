import { Outlet, createFileRoute } from "@tanstack/react-router";

/** Parent layout for the project index and dynamic case-study routes. */
export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return <Outlet />;
}
