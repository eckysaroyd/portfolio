import { getProjects } from "@/lib/portfolio-data";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
