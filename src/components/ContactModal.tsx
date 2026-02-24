"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, CheckCircle2, XCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  subject: "Project Inquiry",
  message: "",
  projectType: "",
  budget: "",
  timeline: "",
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm]           = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]       = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg]   = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        onClose();
        setForm(INITIAL_FORM);
        setStatus("idle");
      }, 2500);
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled =
    submitting || !form.name.trim() || !form.email.trim() || !form.message.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Let&apos;s Start a Project</DialogTitle>
          <DialogDescription>
            Tell me about your project and I&apos;ll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email Address *</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
                         text-sm shadow-sm transition-colors focus-visible:outline-none
                         focus-visible:ring-1 focus-visible:ring-ring"
            >
              {["Project Inquiry", "Consultation Request", "Partnership Opportunity", "Job Opportunity", "General Question"].map(
                (s) => <option key={s} value={s}>{s}</option>
              )}
            </select>
          </div>

          {/* Project type / Budget / Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Project Type",
                name: "projectType",
                options: ["Web Application", "E-commerce", "Mobile App", "API Development", "Consulting", "Other"],
              },
              {
                label: "Budget",
                name: "budget",
                options: ["$1k–$5k", "$5k–$10k", "$10k–$25k", "$25k+", "Let's discuss"],
              },
              {
                label: "Timeline",
                name: "timeline",
                options: ["ASAP", "1–2 weeks", "1 month", "2–3 months", "3+ months", "Flexible"],
              },
            ].map(({ label, name, options }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{label}</label>
                <select
                  name={name}
                  value={form[name as keyof FormData]}
                  onChange={handleChange}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
                             text-sm shadow-sm transition-colors focus-visible:outline-none
                             focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Project Description *</label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your project, goals, and any specific requirements..."
              rows={5}
              required
              className="resize-none"
            />
          </div>

          {/* Status feedback */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              Message sent! I&apos;ll get back to you within 24 hours.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <XCircle className="h-4 w-4 flex-shrink-0" />
              {errorMsg || "Failed to send. Please try again or email me directly."}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isDisabled} className="flex-1 gap-2">
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
