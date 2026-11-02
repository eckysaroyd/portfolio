import { getExperience } from "@/lib/portfolio-data";
import ExperienceClient from "./ExperienceClient";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experience = await getExperience();
  return <ExperienceClient experience={experience} />;
}
