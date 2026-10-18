import { getSkills } from "@/lib/portfolio-data";
import SkillsClient from "./SkillsClient";

export default async function SkillsPage() {
  const skills = await getSkills();
  return <SkillsClient skills={skills} />;
}
