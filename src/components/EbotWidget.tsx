"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Send, X, Minimize2, Maximize2, Mic,
  Briefcase, FolderOpen, Rocket, Code2,
  Paperclip, Globe, MoreHorizontal,
  ChevronDown, ChevronRight, User, Mail, Calendar, Database, FileText,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  role: "bot" | "user";
  content: string;
  time: string;
}

// ── Ebot Logo Avatar (transparent PNG, for header, bubbles, hover pill) ────
function EbotAvatar({ size = "md" }: { size?: "sm" | "md" | "lg"; white?: boolean }) {
  const dim = size === "sm" ? 32 : size === "lg" ? 64 : 44;
  return (
    <div className="flex-shrink-0" style={{ width: dim, height: dim }}>
      <Image
        src="/images/ebot-icon.svg"
        alt="Ebot"
        width={dim}
        height={dim}
        className="w-full h-full object-contain"
        unoptimized
      />
    </div>
  );
}

// ── Quick Actions ──────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { Icon: Briefcase, label: "Explore my services", sub: "What can I build for you?",  msg: "Tell me about your services and what you can build for clients." },
  { Icon: FolderOpen, label: "View my projects",  sub: "See my recent work",          msg: "Show me your recent projects and portfolio highlights."           },
  { Icon: Rocket,     label: "Start a project inquiry", sub: "Discuss your idea",     msg: "I'd like to start a project inquiry.", showForm: true             },
  { Icon: Code2,      label: "Technical question", sub: "Get expert advice",          msg: "I have a technical question for you."                             },
] as const;

function formatTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

const WELCOME: Message = {
  role: "bot",
  time: formatTime(),
  content: "Hi! 👋 I'm Ebot, Ecky's AI assistant.\nI can help you explore his work, discuss software and AI solutions, or get your project started.\n\n**What would you like to know?**",
};

// ── Inline Project Inquiry Form ────────────────────────────────────────────
function InlineInquiryForm({ onDone }: { onDone: () => void }) {
  const [f, setF] = useState({ project: "", budget: "", timeline: "", name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f, v: string) => setF(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name, email: f.email,
          subject: "Project Inquiry via Ebot",
          message: `Project: ${f.project}\nBudget: ${f.budget}\nTimeline: ${f.timeline}`,
          projectType: "", budget: f.budget, timeline: f.timeline,
        }),
      });
    } catch { /* silent */ }
    setSubmitting(false);
    setDone(true);
    setTimeout(onDone, 2500);
  };

  if (done) return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
      <p className="text-sm font-semibold text-green-700">✅ Inquiry submitted!</p>
      <p className="text-xs text-green-600 mt-1">Ecky will get back to you soon.</p>
    </div>
  );

  const inputCls = "w-full text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder:text-gray-400 bg-white";
  const selectCls = "w-full text-xs border border-gray-200 rounded-xl pl-7 pr-6 py-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 cursor-pointer text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      {/* Form header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-50 bg-blue-50/50">
        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
          <FileText className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900">Project Inquiry</p>
          <p className="text-[11px] text-gray-500 leading-none mt-0.5">Let&apos;s capture the key details about your project.</p>
        </div>
      </div>

      <form onSubmit={submit} className="p-4 space-y-3">
        {/* Project description */}
        <div>
          <label className="text-[11px] font-semibold text-gray-700 mb-1 block">
            What do you want to build? <span className="text-red-500">*</span>
          </label>
          <textarea
            value={f.project} onChange={e => set("project", e.target.value)}
            placeholder="e.g. AI SaaS platform for healthcare..."
            rows={3} required
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Budget + Timeline */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 mb-1 block">Budget Range</label>
            <div className="relative">
              <Database className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              <select value={f.budget} onChange={e => set("budget", e.target.value)} className={selectCls}>
                <option value="">Select budget</option>
                {["$1k–$5k","$5k–$10k","$10k–$25k","$25k+","Let's discuss"].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 mb-1 block">Timeline</label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              <select value={f.timeline} onChange={e => set("timeline", e.target.value)} className={selectCls}>
                <option value="">Select timeline</option>
                {["ASAP","1–2 weeks","1 month","2–3 months","3+ months","Flexible"].map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-gray-700 mb-1 block">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              <input value={f.name} onChange={e => set("name", e.target.value)}
                placeholder="Enter your name" required
                className={`${inputCls} pl-7`} />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-700 mb-1 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              <input type="email" value={f.email} onChange={e => set("email", e.target.value)}
                placeholder="you@example.com" required
                className={`${inputCls} pl-7`} />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={submitting}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                     disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl
                     transition-colors shadow-lg shadow-blue-600/25"
        >
          {submitting ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
          ) : (
            <><Send className="h-4 w-4" /> Submit Inquiry</>
          )}
        </button>
      </form>
    </div>
  );
}

// ── Message Bubble ─────────────────────────────────────────────────────────
function BotBubble({ msg, isStreaming }: { msg: Message; isStreaming: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <EbotAvatar size="sm" white />
      <div className="max-w-[82%]">
        <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm border border-gray-100/80">
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
            {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
            {isStreaming && !msg.content && (
              <span className="inline-flex items-center gap-1 h-4">
                {[0, 150, 300].map(d => (
                  <span key={d} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${d}ms` }} />
                ))}
              </span>
            )}
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-1 ml-1">{msg.time}</p>
      </div>
    </div>
  );
}

function UserBubble({ msg }: { msg: Message }) {
  return (
    <div className="flex items-end justify-end gap-2">
      <div className="max-w-[75%]">
        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-3.5 py-3">
          <p className="text-sm text-white leading-relaxed">{msg.content}</p>
        </div>
        <p className="text-[11px] text-gray-400 mt-1 text-right mr-1">{msg.time}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mb-5">
        <User className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  );
}

// ── Main Widget ────────────────────────────────────────────────────────────
export function EbotWidget() {
  const [isOpen, setIsOpen]           = useState(false);
  const [isMin, setIsMin]             = useState(false);
  const [messages, setMessages]       = useState<Message[]>([WELCOME]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [showForm, setShowForm]       = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasNew, setHasNew]           = useState(false);
  const [isListening, setIsListening] = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const msgRef     = useRef<Message[]>([WELCOME]);
  const recognitionRef = useRef<any>(null); // Web Speech API — no TS types available
  msgRef.current   = messages;

  const toggleMic = useCallback(() => {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;

    if (!SR) {
      alert("Your browser doesn't support voice input. Try Chrome or Edge.");
      return;
    }

    if (isListening && recognitionRef.current) {
        (recognitionRef.current as any).stop();
      return;
    }

    const recognition: any = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart  = () => setIsListening(true);
    recognition.onend    = () => setIsListening(false);
    recognition.onerror  = () => setIsListening(false);

    recognition.onresult = (e: { results: { isFinal: boolean; 0: { transcript: string } }[] }) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
      if (e.results[e.results.length - 1].isFinal) {
        setIsListening(false);
      }
    };

    recognition.start();
  }, [isListening]);

  // Hide tooltip after 5 s
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showForm]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMin) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen, isMin]);

  const send = useCallback(async (text: string, opts?: { showForm?: boolean }) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed, time: formatTime() };
    const botMsg:  Message = { role: "bot",  content: "",      time: formatTime() };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
    setLoading(true);
    if (opts?.showForm) setShowForm(true);

    try {
      const history = [...msgRef.current, userMsg].map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("API error");

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snapshot = accumulated;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...botMsg, content: snapshot };
          return updated;
        });
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...botMsg,
          content: "Sorry, I ran into an issue. Please try again or email enyato98@gmail.com directly.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
      // Show badge if chat is closed or minimized when bot replies
      setHasNew(prev => (!isOpen || isMin) ? true : prev);
    }
  }, [loading, isOpen, isMin]);

  const openChat = () => {
    setIsOpen(true);
    setIsMin(false);
    setHasNew(false);
    setShowTooltip(false);
  };

  const showsQuickActions = messages.length === 1 && !loading;
  const lastBotIsStreaming = loading && messages[messages.length - 1]?.role === "bot";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 select-none">

      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      {isOpen && !isMin && (
        <div
          className="flex flex-col bg-gray-50 rounded-2xl sm:rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden border border-gray-200/60"
          style={{
            width: "min(390px, calc(100vw - 32px))",
            height: "min(580px, calc(100dvh - 100px))",
          }}
        >
          {/* Header */}
          <div
            className="relative flex items-center gap-3 px-4 py-4 flex-shrink-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)" }}
          >
            {/* Wave decoration */}
            <svg className="absolute bottom-0 left-0 w-full" height="16" viewBox="0 0 390 16" preserveAspectRatio="none" aria-hidden>
              <path d="M0 8 Q48 0 97 8 T194 8 T291 8 T390 8 V16 H0Z" fill="white" fillOpacity="0.08" />
            </svg>

            <EbotAvatar size="md" white />

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight">Ebot</p>
              <p className="text-blue-200 text-xs leading-none mt-0.5">Ecky&apos;s AI Assistant</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                <span className="text-green-300 text-[11px] font-medium">Online</span>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              {[
                { Icon: Maximize2, title: "Expand",   action: () => {} },
                { Icon: Minimize2, title: "Minimize", action: () => setIsMin(true) },
                { Icon: X,         title: "Close",    action: () => setIsOpen(false) },
              ].map(({ Icon, title, action }) => (
                <button key={title} title={title} onClick={action}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white">
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) =>
              msg.role === "bot"
                ? <BotBubble key={i} msg={msg} isStreaming={lastBotIsStreaming && i === messages.length - 1} />
                : <UserBubble key={i} msg={msg} />
            )}

            {/* Quick actions grid */}
            {showsQuickActions && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                {QUICK_ACTIONS.map((action) => (
                  <button key={action.label} onClick={() => send(action.msg, { showForm: "showForm" in action ? action.showForm : false })}
                    className="flex items-start gap-2 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm
                               hover:border-blue-200 hover:shadow-md text-left transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center flex-shrink-0">
                      <action.Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-xs font-bold text-gray-800 leading-snug">{action.label}</p>
                      <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{action.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Inline inquiry form */}
            {showForm && (
              <InlineInquiryForm onDone={() => setShowForm(false)} />
            )}

            <div ref={bottomRef} />
          </div>

          {/* Bottom bar */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 rounded-b-3xl">
            {/* Utility row */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-50">
              {[
                { Icon: Paperclip,     label: "Attach File"  },
                { Icon: Globe,         label: "Web Search"   },
                { Icon: MoreHorizontal, label: "More Options" },
              ].map(({ Icon, label }) => (
                <button key={label}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 hover:bg-gray-100
                             transition-colors text-[11px] text-gray-500 font-medium">
                  <Icon className="h-3 w-3" /> {label}
                  {label === "More Options" && <ChevronDown className="h-2.5 w-2.5 ml-0.5" />}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder={isListening ? "Listening..." : "Type your message..."}
                disabled={loading}
                className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                onClick={toggleMic}
                title={isListening ? "Stop recording" : "Speak your message"}
                className={`w-8 h-8 flex items-center justify-center transition-colors flex-shrink-0 rounded-full ${
                  isListening
                    ? "text-white bg-red-500 animate-pulse"
                    : "text-gray-400 hover:text-blue-600"
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center justify-center transition-all shadow-lg shadow-blue-600/30 flex-shrink-0"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Tooltip ─────────────────────────────────────────────────────── */}
      {!isOpen && showTooltip && (
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 pointer-events-none">
          <p className="text-sm font-bold text-gray-900">Hi! I&apos;m Ebot</p>
          <p className="text-xs text-gray-500">Ask me anything!</p>
          {/* Tail */}
          <div className="absolute -bottom-2 right-7 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* ── Floating Button ──────────────────────────────────────────────── */}
      <div className="relative group">
        {/* Button is sized to the logo — no circular wrapper, no background */}
        <button
          onClick={openChat}
          aria-label="Chat with Ebot"
          title="Chat with Ebot"
          className="relative w-[72px] h-[76px] flex items-center justify-center bg-transparent border-none
                     hover:scale-110 active:scale-95 transition-transform duration-200
                     drop-shadow-[0_6px_18px_rgba(14,165,233,0.55)]"
        >
          <Image
            src="/images/ebot-icon.svg"
            alt="Ebot"
            width={72}
            height={72}
            className="w-full h-full object-contain"
            unoptimized
          />
        </button>

        {/* Badge: top-right, overlaps the sparkle area of the logo */}
        {hasNew && !isOpen && (
          <span className="absolute top-1 right-0 w-[22px] h-[22px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
            1
          </span>
        )}

        {/* Hover pill label */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none
                        transition-opacity duration-200 whitespace-nowrap">
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-xl"
               style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)" }}>
            <EbotAvatar size="sm" white />
            <div>
              <p className="text-white font-bold text-sm leading-tight">Chat with Ebot</p>
              <p className="text-blue-300 text-xs leading-none mt-0.5">AI Assistant</p>
            </div>
            <ChevronRight className="h-4 w-4 text-blue-300 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
