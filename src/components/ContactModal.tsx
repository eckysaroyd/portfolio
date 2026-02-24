"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle2, XCircle, Sparkles } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface ContactModalProps { isOpen: boolean; onClose: () => void; }

interface FormData {
  name: string; email: string; subject: string; message: string;
  projectType: string; budget: string; timeline: string;
}

const INITIAL_FORM: FormData = {
  name: "", email: "", subject: "Project Inquiry",
  message: "", projectType: "", budget: "", timeline: "",
};

const SELECT_FIELDS = [
  {
    label: "Project Type", name: "projectType",
    options: ["Web Application", "E-commerce", "Mobile App", "API Development", "Consulting", "Other"],
  },
  {
    label: "Budget", name: "budget",
    options: ["$1k–$5k", "$5k–$10k", "$10k–$25k", "$25k+", "Let's discuss"],
  },
  {
    label: "Timeline", name: "timeline",
    options: ["ASAP", "1–2 weeks", "1 month", "2–3 months", "3+ months", "Flexible"],
  },
];

// ── Shared select style ────────────────────────────────────────────────────
const SELECT_CLS =
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm " +
  "text-foreground shadow-sm transition-colors focus-visible:outline-none " +
  "focus-visible:ring-1 focus-visible:ring-ring cursor-pointer";

// ── Component ──────────────────────────────────────────────────────────────
export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm]             = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]         = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg]     = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) { setErrorMsg(data.error ?? "Something went wrong."); setStatus("error"); return; }

      setStatus("success");
      setTimeout(() => { onClose(); setForm(INITIAL_FORM); setStatus("idle"); }, 2800);
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => { if (submitting) return; onClose(); };

  const isDisabled = submitting || !form.name.trim() || !form.email.trim() || !form.message.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto gap-0">

        {/* ── Gradient header ─────────────────────────────────────────────── */}
        <div
          className="relative px-7 pt-8 pb-7 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" }}
        >
          {/* Dot grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
              backgroundSize: "22px 22px",
            }}
          />
          {/* Glow */}
          <div aria-hidden className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-white/60 uppercase tracking-[3px]">
                  New Inquiry
                </span>
              </div>
              <DialogTitle className="text-2xl font-bold text-white leading-tight">
                Let&apos;s Build Together
              </DialogTitle>
              <p className="text-sm text-white/70 mt-1.5">
                Tell me about your project — I&apos;ll reply within 24 hours.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* ── Success state ───────────────────────────────────────────────── */}
        {status === "success" ? (
          <div className="px-7 py-16 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25
                            flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                Check your inbox for a confirmation email.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Auto-reply sent to {form.email}
            </div>
          </div>
        ) : (

        /* ── Form ──────────────────────────────────────────────────────────── */
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Full Name <span className="text-primary">*</span>
              </label>
              <Input name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Email Address <span className="text-primary">*</span>
              </label>
              <Input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your.email@example.com" required />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <select name="subject" value={form.subject} onChange={handleChange} className={SELECT_CLS}>
              {["Project Inquiry", "Consultation Request", "Partnership Opportunity",
                "Job Opportunity", "General Question"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Project Type / Budget / Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SELECT_FIELDS.map(({ label, name, options }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <select
                  name={name}
                  value={form[name as keyof FormData]}
                  onChange={handleChange}
                  className={SELECT_CLS}
                >
                  <option value="">Select</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Project Description <span className="text-primary">*</span>
              </label>
              <span className="text-xs text-muted-foreground font-mono">
                {form.message.length} chars
              </span>
            </div>
            <Textarea
              name="message" value={form.message} onChange={handleChange}
              placeholder="Describe your project, goals, and any specific requirements..."
              rows={5} required className="resize-none"
            />
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-destructive/30
                            bg-destructive/10 p-3.5 text-sm text-destructive">
              <XCircle className="h-4 w-4 flex-shrink-0" />
              {errorMsg || "Failed to send. Please email me directly at enyato98@gmail.com"}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1 pb-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border border-border bg-transparent text-foreground
                         text-sm font-medium py-2.5 hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5
                         bg-primary text-primary-foreground text-sm font-semibold
                         shadow-[0_4px_20px_hsl(var(--primary)/0.3)]
                         hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
