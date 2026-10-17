"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Loader2, Send, CheckCircle2, XCircle,
  User, Mail, MessageSquare, LayoutGrid, Database, Calendar, FileText, ChevronDown, X,
} from "lucide-react";

interface ContactModalProps { isOpen: boolean; onClose: () => void; }

interface FormData {
  name: string; email: string; subject: string; message: string;
  projectType: string; budget: string; timeline: string;
}

const INITIAL_FORM: FormData = {
  name: "", email: "", subject: "Project Inquiry",
  message: "", projectType: "", budget: "", timeline: "",
};

const MAX_CHARS = 500;

// ── Shared input/select className helpers ──────────────────────────────────
const INPUT_CLS =
  "w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm text-foreground " +
  "placeholder:text-muted-foreground shadow-sm transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";

const SELECT_CLS =
  "w-full pl-9 pr-8 py-2 rounded-md border border-input bg-background text-sm text-foreground " +
  "shadow-sm appearance-none cursor-pointer transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm]             = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]         = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg]     = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_CHARS) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto gap-0 [&>button]:hidden">

        {/* ── Gradient header ────────────────────────────────────────────── */}
        <div
          className="relative px-7 pt-8 pb-8 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)" }}
        >
          {/* dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)`,
              backgroundSize: "22px 22px",
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20
                       flex items-center justify-center text-white
                       hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-start justify-between gap-4 pr-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-white/70 uppercase tracking-[3px]">
                  New Inquiry
                </span>
                <span className="text-white/40 text-sm">— —</span>
              </div>
              <DialogTitle className="text-[1.6rem] font-bold text-white leading-tight">
                Let&apos;s build something great
              </DialogTitle>
              <p className="text-sm text-white/70 mt-1.5">
                Share a few details and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Paper plane illustration */}
            <div className="flex-shrink-0 mt-1 opacity-90">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 36L64 8L44 64L34 42L8 36Z" fill="white" fillOpacity="0.9" />
                <path d="M34 42L44 32L64 8" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
                <path d="M34 42L42 56" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Success state ──────────────────────────────────────────────── */}
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

        /* ── Form ──────────────────────────────────────────────────────── */
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

          {/* Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" required
                  className={INPUT_CLS}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your.email@example.com" required
                  className={INPUT_CLS}
                />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Subject <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select name="subject" value={form.subject} onChange={handleChange} className={SELECT_CLS}>
                {["Project Inquiry", "Consultation Request", "Partnership Opportunity",
                  "Job Opportunity", "General Question"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Type / Budget / Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { label: "Project Type", name: "projectType", Icon: LayoutGrid,
                placeholder: "Select type",
                options: ["Web Application", "E-commerce", "Mobile App", "API Development", "Consulting", "Other"] },
              { label: "Budget", name: "budget", Icon: Database,
                placeholder: "Select budget",
                options: ["$1k–$5k", "$5k–$10k", "$10k–$25k", "$25k+", "Let's discuss"] },
              { label: "Timeline", name: "timeline", Icon: Calendar,
                placeholder: "Select timeline",
                options: ["ASAP", "1–2 weeks", "1 month", "2–3 months", "3+ months", "Flexible"] },
            ] as const).map(({ label, name, Icon, placeholder, options }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <select
                    name={name}
                    value={form[name as keyof FormData]}
                    onChange={handleChange}
                    className={SELECT_CLS}
                  >
                    <option value="">{placeholder}</option>
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Project Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">
                Project Description <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-muted-foreground font-mono">
                {form.message.length} / {MAX_CHARS} chars
              </span>
            </div>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Describe your project, goals, and any specific requirements..."
                rows={5} required maxLength={MAX_CHARS}
                className={
                  "w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm text-foreground " +
                  "placeholder:text-muted-foreground shadow-sm resize-none transition-colors " +
                  "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                }
              />
            </div>
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
