import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ─────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

// ── Transporter ───────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── Validation ────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim())    return "Name is required.";
  if (!body.email?.trim())   return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return "Invalid email address.";
  if (!body.message?.trim()) return "Message is required.";
  return null;
}

// ── Email Templates ───────────────────────────────────────────────────────

function notificationHtml(p: ContactPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#94a3b8;white-space:nowrap;border-bottom:1px solid #1e293b;">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#e2e8f0;font-weight:500;border-bottom:1px solid #1e293b;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Portfolio Message</title></head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#0ea5e9,#6366f1);border-radius:12px 12px 0 0;padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Portfolio Notification</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Message Received</h1>
            </td>
            <td align="right" valign="top">
              <div style="background:rgba(255,255,255,0.15);border-radius:50%;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;">
                <span style="font-size:20px;">✉️</span>
              </div>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:#1e293b;padding:32px 40px;">

        <!-- Sender info card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:8px;border:1px solid #334155;margin-bottom:24px;overflow:hidden;">
          ${row("Name",         `<strong style="color:#f1f5f9;">${p.name}</strong>`)}
          ${row("Email",        `<a href="mailto:${p.email}" style="color:#38bdf8;text-decoration:none;">${p.email}</a>`)}
          ${row("Subject",      p.subject || "—")}
          ${row("Project Type", p.projectType || "Not specified")}
          ${row("Budget",       p.budget    || "Not specified")}
          ${row("Timeline",     p.timeline  || "Not specified")}
        </table>

        <!-- Message block -->
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Message</p>
        <div style="background:#0f172a;border-radius:8px;border:1px solid #334155;border-left:3px solid #0ea5e9;padding:20px 24px;">
          <p style="margin:0;font-size:14px;line-height:1.8;color:#cbd5e1;">${p.message.replace(/\n/g, "<br/>")}</p>
        </div>

        <!-- Reply CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr><td align="center">
            <a href="mailto:${p.email}?subject=Re: ${encodeURIComponent(p.subject || "Your Message")}"
               style="display:inline-block;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:0.3px;">
              ↩ Reply to ${p.name.split(" ")[0]}
            </a>
          </td></tr>
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #1e293b;">
        <p style="margin:0;font-size:12px;color:#475569;text-align:center;">
          Sent from your portfolio contact form · <a href="https://github.com/eckysaroyd" style="color:#38bdf8;text-decoration:none;">GitHub</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function autoReplyHtml(p: ContactPayload): string {
  const firstName = p.name.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Message Received</title></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header with gradient -->
      <tr><td style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);border-radius:12px 12px 0 0;padding:40px;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);">Message Confirmed</p>
        <h1 style="margin:0 0 4px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">Hey ${firstName}, I got your message!</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.75);">reaching out — I'll respond within 24 hours.</p>
      </td></tr>

      <!-- White body -->
      <tr><td style="background:#ffffff;padding:36px 40px;">

        <!-- Greeting paragraph -->
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#374151;">
          Hi <strong>${firstName}</strong>,
        </p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#374151;">
          Your message has landed safely in my inbox. I personally review every inquiry and will get back to you with a thoughtful response shortly.
        </p>

        <!-- What to expect card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd;padding:0;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0284c7;">What happens next</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:5px 0;vertical-align:top;padding-right:10px;"><span style="color:#0ea5e9;font-weight:700;">01</span></td>
                <td style="padding:5px 0;font-size:14px;color:#374151;line-height:1.5;">I review your message — usually within a few hours.</td>
              </tr>
              <tr>
                <td style="padding:5px 0;vertical-align:top;padding-right:10px;"><span style="color:#0ea5e9;font-weight:700;">02</span></td>
                <td style="padding:5px 0;font-size:14px;color:#374151;line-height:1.5;">I'll reply directly to <strong>${p.email}</strong> within 24 hours.</td>
              </tr>
              <tr>
                <td style="padding:5px 0;vertical-align:top;padding-right:10px;"><span style="color:#0ea5e9;font-weight:700;">03</span></td>
                <td style="padding:5px 0;font-size:14px;color:#374151;line-height:1.5;">We'll schedule a call if your project is a good fit.</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <!-- Message recap -->
        <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;">Your message</p>
        <div style="background:#f9fafb;border-radius:8px;border-left:3px solid #0ea5e9;padding:16px 20px;margin-bottom:28px;">
          <p style="margin:0;font-size:14px;line-height:1.8;color:#6b7280;">${p.message.replace(/\n/g, "<br/>")}</p>
        </div>

        <!-- Social CTAs -->
        <p style="margin:0 0 14px;font-size:14px;color:#374151;">In the meantime, feel free to explore my work:</p>
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:10px;">
              <a href="https://github.com/eckysaroyd" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:6px;">
                GitHub →
              </a>
            </td>
            <td>
              <a href="https://www.linkedin.com/in/eckysaroyd/" style="display:inline-block;background:#0a66c2;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:6px;">
                LinkedIn →
              </a>
            </td>
          </tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f1f5f9;border-radius:0 0 12px 12px;padding:24px 40px;border-top:1px solid #e2e8f0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0;font-size:13px;font-weight:600;color:#374151;">Eckysaroyd Nyato</p>
              <p style="margin:2px 0 0;font-size:12px;color:#9ca3af;">Senior Full-Stack &amp; AI Automation Engineer</p>
            </td>
            <td align="right">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:right;">
                <a href="mailto:enyato98@gmail.com" style="color:#0ea5e9;text-decoration:none;">enyato98@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── POST /api/contact ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body: Partial<ContactPayload> = await req.json();

  const error = validate(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const payload = body as ContactPayload;
  const to      = process.env.CONTACT_TO_EMAIL!;

  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject || "New Message"} — from ${payload.name}`,
      html:    notificationHtml(payload),
    });

    await transporter.sendMail({
      from:    `"Eckysaroyd Nyato" <${process.env.GMAIL_USER}>`,
      to:      payload.email,
      subject: `Got your message, ${payload.name.split(" ")[0]}! · Eckysaroyd Nyato`,
      html:    autoReplyHtml(payload),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] sendMail error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
