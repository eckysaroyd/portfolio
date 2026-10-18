import { getPortfolioMeta } from "@/lib/portfolio-data";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const meta = await getPortfolioMeta();
  return (
    <ContactClient
      email={meta.email}
      linkedin={meta.linkedin}
      github={meta.github}
    />
  );
}
