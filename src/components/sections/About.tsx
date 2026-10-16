import info from "@/data/user_info";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="pt-20 pb-20">

      {/* Header */}
      <div className="mb-10 space-y-2">
        <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase">
          Passionate About
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-foreground">
          Building Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left — bio */}
        <div className="space-y-6">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m <span className="font-semibold text-foreground">{info.main.name}</span> — a{" "}
              <span className="font-semibold text-primary">{info.about.highlight}</span> with 10+ years of
              proven experience designing, building, and deploying production-grade systems that solve
              real business problems at scale.
            </p>
            <p>{info.about.body}</p>
          </div>

          {/* Trait badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {info.about.traits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-primary/25
                           bg-primary/8 text-primary"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Quote */}
          <div className="relative p-5 rounded-2xl border border-border bg-card mt-4">
            <Quote className="absolute top-4 left-4 h-5 w-5 text-primary/30" />
            <p className="pl-7 text-sm italic text-muted-foreground leading-relaxed">
              {info.about.quote}
            </p>
          </div>
        </div>

        {/* Right — photo */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-primary/8 blur-3xl" />
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-b from-primary/50 via-primary/15 to-transparent">
              <div className="relative w-64 h-80 sm:w-72 sm:h-[360px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={info.main.photo}
                  alt={info.main.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Location chip */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium shadow-lg">
                <span className="text-primary">●</span>{" "}
                <span className="text-foreground">{info.main.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
