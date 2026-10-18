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
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: (Number(process.env.SMTP_PORT) || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
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

const BASE = "https://eckysaroyd.vercel.app";

function notificationHtml(p: ContactPayload): string {
  const now = new Date();
  const datetime =
    now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " • " +
    now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const row = (icon: string, label: string, value: string) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:16px;text-align:center;width:44px;vertical-align:middle;">${icon}</td>
      <td style="padding:12px 16px 12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#64748b;width:130px;vertical-align:middle;">${label}</td>
      <td style="padding:12px 20px 12px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;vertical-align:middle;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Portfolio Inquiry</title></head>
<body style="margin:0;padding:0;background-color:#eef2fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2fb;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(37,99,235,0.10);">

    <!-- HEADER -->
    <tr><td style="padding:18px 28px;background:#ffffff;border-bottom:1px solid #f0f4ff;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle">
          <img src="${BASE}/images/en-logo.png" alt="Eckysaroyd Nyato" height="44" style="height:44px;width:auto;display:block;">
        </td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600;color:#2563eb;white-space:nowrap;">&#x2709;&nbsp; Portfolio Notification</span>
        </td>
      </tr></table>
    </td></tr>

    <!-- BANNER -->
    <tr><td style="padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a4fd8 0%,#2563eb 55%,#1d86e8 100%);">
        <tr>
          <td style="padding:32px 40px;vertical-align:middle;width:55%;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:700;">New Message Received</p>
            <h1 style="margin:0 0 10px;font-size:24px;font-weight:800;color:#ffffff;line-height:1.3;">You have a new<br>portfolio inquiry!</h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">Someone has submitted a message through<br>your portfolio contact form.</p>
          </td>
          <td style="padding:0;vertical-align:bottom;text-align:right;width:45%;">
            <img src="${BASE}/images/email-banner.png" alt="" width="250" style="width:250px;height:auto;display:block;margin-left:auto;">
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- CONTACT DETAILS CARD -->
    <tr><td style="padding:24px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <tr><td colspan="3" style="padding:16px 20px;background:#f8faff;border-bottom:1px solid #e8eef8;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="middle">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="padding-right:12px;">
                  <div style="width:38px;height:38px;background:#eff6ff;border-radius:50%;text-align:center;line-height:38px;font-size:16px;border:1px solid #dbeafe;">&#x1F464;</div>
                </td>
                <td valign="middle">
                  <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;">Contact Details</p>
                  <p style="margin:2px 0 0;font-size:11px;color:#94a3b8;">Here are the details from the submitted form.</p>
                </td>
              </tr></table>
            </td>
            <td align="right" valign="middle">
              <span style="display:inline-block;background:#f0f9ff;border:1px solid #bae6fd;border-radius:20px;padding:5px 12px;font-size:11px;color:#0284c7;white-space:nowrap;">&#x1F4C5; ${datetime}</span>
            </td>
          </tr></table>
        </td></tr>
        ${row("&#x1F464;", "Name", `<strong style="color:#1e293b;font-weight:700;">${p.name}</strong>`)}
        ${row("&#x2709;&#xFE0F;", "Email", `<a href="mailto:${p.email}" style="color:#2563eb;text-decoration:none;font-weight:500;">${p.email}</a>`)}
        ${row("&#x1F4AC;", "Subject", p.subject || "&#x2014;")}
        ${row("&#x26A1;", "Project Type", p.projectType || "Not specified")}
        ${row("&#x1F4B0;", "Budget", p.budget || "Not specified")}
        ${row("&#x1F4C5;", "Timeline", p.timeline || "Not specified")}
      </table>
    </td></tr>

    <!-- MESSAGE CARD -->
    <tr><td style="padding:16px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border:1px solid #ede9fe;border-radius:12px;">
        <tr><td style="padding:18px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="top" width="58" style="padding-right:14px;">
              <div style="width:44px;height:44px;background:#ede9fe;border-radius:50%;text-align:center;line-height:44px;font-size:20px;">&#x1F4AC;</div>
            </td>
            <td>
              <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1e293b;">Message</p>
              <div style="background:#ffffff;border-radius:8px;padding:14px 16px;border:1px solid #e8eef8;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">${p.message.replace(/\n/g, "<br/>")}</p>
              </div>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>

    <!-- REPLY BUTTON -->
    <tr><td style="padding:20px 28px 24px;" align="center">
      <a href="mailto:${p.email}?subject=Re: ${encodeURIComponent(p.subject || "Your Message")}"
         style="display:block;background:linear-gradient(135deg,#1a56db,#2563eb);color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:10px;text-align:center;">
        &#x21A9;&nbsp;&nbsp;Reply to ${p.name.split(" ")[0]}
      </a>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="padding:18px 28px;background:#f8faff;border-top:1px solid #e8eef8;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" width="35%">
          <img src="${BASE}/images/en-logo.png" alt="Eckysaroyd Nyato" height="32" style="height:32px;width:auto;display:block;">
        </td>
        <td align="center" valign="middle" width="30%">
          <table cellpadding="0" cellspacing="0" align="center"><tr>
            <td style="padding:0 3px;"><a href="https://www.linkedin.com/in/eckysaroyd/" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:30px;font-size:11px;font-weight:700;text-decoration:none;color:#2563eb;background:#fff;">in</a></td>
            <td style="padding:0 3px;"><a href="https://github.com/eckysaroyd" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:#334155;background:#fff;">GH</a></td>
            <td style="padding:0 3px;"><a href="https://twitter.com/eckysaroyd" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:30px;font-size:12px;font-weight:700;text-decoration:none;color:#334155;background:#fff;">&#x1D54F;</a></td>
            <td style="padding:0 3px;"><a href="${BASE}" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:28px;font-size:13px;text-decoration:none;color:#334155;background:#fff;">&#x1F310;</a></td>
          </tr></table>
        </td>
        <td align="right" valign="middle" width="35%">
          <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;text-align:right;line-height:1.5;">This message was sent from your portfolio<br>contact form.</p>
          <a href="${BASE}" style="font-size:12px;color:#2563eb;text-decoration:none;font-weight:600;">Visit Portfolio &#x2192;</a>
        </td>
      </tr></table>
    </td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

function autoReplyHtml(p: ContactPayload): string {
  const firstName = p.name.split(" ")[0];

  const step = (num: string, text: string) => `
    <tr>
      <td valign="top" style="padding:5px 0;width:32px;">
        <span style="display:inline-block;width:24px;height:24px;background:#2563eb;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#ffffff;">${num}</span>
      </td>
      <td valign="middle" style="padding:5px 0 5px 10px;font-size:13px;color:#475569;line-height:1.6;">${text}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Message Received</title></head>
<body style="margin:0;padding:0;background-color:#eef2fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2fb;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(37,99,235,0.10);">

    <!-- HEADER -->
    <tr><td style="padding:18px 28px;background:#ffffff;border-bottom:1px solid #f0f4ff;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle">
          <img src="${BASE}/images/en-logo.png" alt="Eckysaroyd Nyato" height="44" style="height:44px;width:auto;display:block;">
        </td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600;color:#16a34a;white-space:nowrap;">&#x2713;&nbsp; Message Confirmed</span>
        </td>
      </tr></table>
    </td></tr>

    <!-- BANNER -->
    <tr><td style="padding:0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a4fd8 0%,#2563eb 55%,#1d86e8 100%);">
        <tr>
          <td style="padding:32px 40px;vertical-align:middle;width:55%;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:700;">Message Confirmed</p>
            <h1 style="margin:0 0 10px;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">Got your message,<br>${firstName}!</h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">I&apos;ll review your message and<br>get back to you within 24 hours.</p>
          </td>
          <td style="padding:0;vertical-align:bottom;text-align:right;width:45%;">
            <img src="${BASE}/images/email-banner.png" alt="" width="250" style="width:250px;height:auto;display:block;margin-left:auto;">
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- WHAT HAPPENS NEXT -->
    <tr><td style="padding:24px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;">
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0284c7;">What happens next</p>
          <table cellpadding="0" cellspacing="0" width="100%">
            ${step("1", "I review your message — usually within a few hours.")}
            ${step("2", `I&apos;ll reply directly to <strong>${p.email}</strong> within 24 hours.`)}
            ${step("3", "We&apos;ll schedule a discovery call if your project is a great fit.")}
          </table>
        </td></tr>
      </table>
    </td></tr>

    <!-- MESSAGE RECAP -->
    <tr><td style="padding:16px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border:1px solid #ede9fe;border-radius:12px;">
        <tr><td style="padding:18px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="top" width="58" style="padding-right:14px;">
              <div style="width:44px;height:44px;background:#ede9fe;border-radius:50%;text-align:center;line-height:44px;font-size:20px;">&#x1F4AC;</div>
            </td>
            <td>
              <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1e293b;">Your Message</p>
              <div style="background:#ffffff;border-radius:8px;padding:14px 16px;border:1px solid #e8eef8;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">${p.message.replace(/\n/g, "<br/>")}</p>
              </div>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>

    <!-- SOCIAL CTAs -->
    <tr><td style="padding:20px 28px 24px;">
      <p style="margin:0 0 14px;font-size:13px;color:#64748b;">In the meantime, explore my work:</p>
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px;"><a href="https://github.com/eckysaroyd" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;">GitHub &#x2192;</a></td>
        <td style="padding-right:10px;"><a href="https://www.linkedin.com/in/eckysaroyd/" style="display:inline-block;background:#0a66c2;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;">LinkedIn &#x2192;</a></td>
        <td><a href="${BASE}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;">Portfolio &#x2192;</a></td>
      </tr></table>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="padding:18px 28px;background:#f8faff;border-top:1px solid #e8eef8;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" width="35%">
          <img src="${BASE}/images/en-logo.png" alt="Eckysaroyd Nyato" height="32" style="height:32px;width:auto;display:block;">
        </td>
        <td align="center" valign="middle" width="30%">
          <table cellpadding="0" cellspacing="0" align="center"><tr>
            <td style="padding:0 3px;"><a href="https://www.linkedin.com/in/eckysaroyd/" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:30px;font-size:11px;font-weight:700;text-decoration:none;color:#2563eb;background:#fff;">in</a></td>
            <td style="padding:0 3px;"><a href="https://github.com/eckysaroyd" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:28px;font-size:10px;text-decoration:none;color:#334155;background:#fff;">GH</a></td>
            <td style="padding:0 3px;"><a href="https://twitter.com/eckysaroyd" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:30px;font-size:12px;font-weight:700;text-decoration:none;color:#334155;background:#fff;">&#x1D54F;</a></td>
            <td style="padding:0 3px;"><a href="${BASE}" style="display:inline-block;width:30px;height:30px;border:1px solid #e2e8f0;border-radius:50%;text-align:center;line-height:28px;font-size:13px;text-decoration:none;color:#334155;background:#fff;">&#x1F310;</a></td>
          </tr></table>
        </td>
        <td align="right" valign="middle" width="35%">
          <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;text-align:right;line-height:1.5;">This is an automated reply confirming<br>we received your message.</p>
          <a href="${BASE}" style="font-size:12px;color:#2563eb;text-decoration:none;font-weight:600;">Visit Portfolio &#x2192;</a>
        </td>
      </tr></table>
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
  const to      = process.env.CONTACT_EMAIL_TO!;

  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject || "New Message"} — from ${payload.name}`,
      html:    notificationHtml(payload),
    });

    await transporter.sendMail({
      from:    `"Eckysaroyd Nyato" <${process.env.SMTP_USER}>`,
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
