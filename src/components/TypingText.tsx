"use client";

import { useState, useEffect } from "react";

// Lines that cycle — mirrors the README typing SVG
const LINES = [
  "Senior Full-Stack & AI Automation Engineer",
  "Next.js · Node.js · LLM Integrations",
  "Scalable SaaS Architect",
  "6+ Years Building Production Systems",
];

const TYPE_MS   = 55;   // ms per character while typing
const DELETE_MS = 28;   // ms per character while deleting (faster)
const PAUSE_MS  = 1800; // pause after fully typed
const NEXT_MS   = 400;  // pause after fully deleted before next line

export function TypingText() {
  const [displayText, setDisplayText] = useState("");
  const [lineIdx,     setLineIdx]     = useState(0);
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const current = LINES[lineIdx];
    let delay: number;
    let action: () => void;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        // Still typing out the current line
        delay  = TYPE_MS;
        action = () => setDisplayText(current.slice(0, displayText.length + 1));
      } else {
        // Fully typed — hold, then start deleting
        delay  = PAUSE_MS;
        action = () => setIsDeleting(true);
      }
    } else {
      if (displayText.length > 0) {
        // Still deleting
        delay  = DELETE_MS;
        action = () => setDisplayText(displayText.slice(0, -1));
      } else {
        // Fully deleted — brief pause, then advance to next line
        delay  = NEXT_MS;
        action = () => {
          setIsDeleting(false);
          setLineIdx((i) => (i + 1) % LINES.length);
        };
      }
    }

    const timer = setTimeout(action, delay);
    return () => clearTimeout(timer);
  }, [displayText, lineIdx, isDeleting]);

  return (
    /* Fixed height prevents layout shift as text length changes */
    <p className="h-6 font-semibold text-primary tracking-wide font-mono text-base">
      {displayText}
      <span
        aria-hidden="true"
        className="cursor-blink inline-block w-[2px] h-[0.9em] bg-primary ml-[2px] align-middle rounded-sm"
      />
    </p>
  );
}
