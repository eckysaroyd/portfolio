import { getExperience } from "@/lib/portfolio-data";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const experience = await getExperience();
  return <ExperienceClient experience={experience} />;
}
