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

// Logo block: circular EN orbit icon + name + tagline (matches template header/footer)
const logoImg = (iconSize: number, nameSize: number, tagSize: number) => `
  <table cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:10px;vertical-align:middle;">
      <img src="${BASE}/images/email-icon.png" alt="EN" width="${iconSize}" height="${iconSize}"
           style="width:${iconSize}px;height:${iconSize}px;display:block;border:0;border-radius:${Math.round(iconSize * 0.22)}px;" loading="eager">
    </td>
    <td valign="middle">
      <p style="margin:0;font-size:${nameSize}px;font-weight:800;color:#1e293b;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Eckysaroyd<br>Nyato</p>
      <p style="margin:3px 0 0;font-size:${tagSize}px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Full-Stack &amp; AI Engineer</p>
    </td>
  </tr></table>`;

// Social icon circle
const socialCircle = (href: string, label: string, color: string) =>
  `<td style="padding:0 4px;"><a href="${href}" style="display:inline-block;width:32px;height:32px;border:1.5px solid #e2e8f0;border-radius:50%;text-align:center;line-height:30px;font-size:11px;font-weight:700;text-decoration:none;color:${color};background:#ffffff;font-family:Arial,sans-serif;">${label}</a></td>`;

function notificationHtml(p: ContactPayload): string {
  const now = new Date();
  const datetime =
    now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " • " +
    now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const row = (icon: string, label: string, value: string) => `
    <tr>
      <td style="padding:13px 10px 13px 20px;border-bottom:1px solid #f1f5f9;width:40px;text-align:center;vertical-align:middle;">
        <span style="font-size:16px;color:#94a3b8;">${icon}</span>
      </td>
      <td style="padding:13px 16px 13px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#94a3b8;width:120px;vertical-align:middle;font-weight:500;">${label}</td>
      <td style="padding:13px 20px 13px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#1e293b;vertical-align:middle;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Portfolio Inquiry</title></head>
<body style="margin:0;padding:0;background-color:#eef2fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2fb;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(37,99,235,0.08);">

    <!-- HEADER: EN wordmark logo + notification badge -->
    <tr><td style="padding:20px 28px;background:#ffffff;border-bottom:1px solid #f0f4ff;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle">${logoImg(50, 15, 11)}</td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600;color:#2563eb;white-space:nowrap;">&#x2709;&nbsp; Portfolio Notification</span>
        </td>
      </tr></table>
    </td></tr>

    <!-- FULL-WIDTH BANNER — email-banner.png as background, text overlaid left -->
    <tr><td style="padding:0;background-color:#1a56db;">
      <table width="100%" cellpadding="0" cellspacing="0"
             style="background-image:url('${BASE}/images/email-banner.png');background-size:cover;background-position:center;background-color:#1a56db;">
        <tr>
          <td style="padding:40px 0 40px 36px;vertical-align:middle;width:55%;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);font-weight:700;">New Message Received</p>
            <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">You have a new<br>portfolio inquiry!</h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.90);line-height:1.65;">Someone has submitted a message through<br>your portfolio contact form.</p>
          </td>
          <td style="width:45%;">&nbsp;</td>
        </tr>
      </table>
    </td></tr>

    <!-- CONTACT DETAILS CARD -->
    <tr><td style="padding:24px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8eef8;border-radius:14px;overflow:hidden;background:#ffffff;">
        <!-- Card header -->
        <tr><td colspan="3" style="padding:18px 20px;border-bottom:1px solid #f1f5f9;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td valign="middle">
              <table cellpadding="0" cellspacing="0"><tr>
                <td style="padding-right:14px;">
                  <div style="width:44px;height:44px;background:#eff6ff;border-radius:50%;text-align:center;line-height:44px;font-size:18px;">&#x1F464;</div>
                </td>
                <td valign="middle">
                  <p style="margin:0;font-size:15px;font-weight:700;color:#1e293b;">Contact Details</p>
                  <p style="margin:3px 0 0;font-size:12px;color:#94a3b8;">Here are the details from the submitted form.</p>
                </td>
              </tr></table>
            </td>
            <td align="right" valign="middle">
              <span style="display:inline-block;background:#f0f9ff;border:1px solid #bae6fd;border-radius:20px;padding:6px 14px;font-size:11px;color:#0284c7;white-space:nowrap;">&#x1F4C5; ${datetime}</span>
            </td>
          </tr></table>
        </td></tr>
        <!-- Data rows -->
        ${row("&#x1F464;", "Name",         `<strong style="color:#1e293b;font-weight:700;">${p.name}</strong>`)}
        ${row("&#x2709;",   "Email",        `<a href="mailto:${p.email}" style="color:#2563eb;text-decoration:none;font-weight:500;">${p.email}</a>`)}
        ${row("&#x1F4AC;", "Subject",      p.subject      || "&mdash;")}
        ${row("&#x25A6;",  "Project Type", p.projectType  || "Not specified")}
        ${row("&#x1F4B3;", "Budget",       p.budget       || "Not specified")}
        ${row("&#x1F4C6;", "Timeline",     p.timeline     || "Not specified")}
      </table>
    </td></tr>

    <!-- MESSAGE CARD -->
    <tr><td style="padding:16px 28px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8eef8;border-radius:14px;overflow:hidden;background:#ffffff;">
        <tr><td style="padding:20px 24px;">
          <table cellpadding="0" cellspacing="0" width="100%"><tr>
            <td valign="top" width="66" style="padding-right:16px;">
              <div style="width:52px;height:52px;background:#ede9fe;border-radius:50%;text-align:center;line-height:52px;font-size:24px;">&#x1F4AC;</div>
            </td>
            <td>
              <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#1e293b;">Message</p>
              <div style="background:#f8faff;border-radius:8px;padding:14px 16px;border:1px solid #e8eef8;">
                <p style="margin:0;font-size:13px;line-height:1.75;color:#64748b;">${p.message.replace(/\n/g, "<br/>")}</p>
              </div>
            </td>
          </tr></table>
        </td></tr>
      </table>
    </td></tr>

    <!-- REPLY BUTTON -->
    <tr><td style="padding:20px 28px 28px;" align="center">
      <a href="mailto:${p.email}?subject=Re%3A%20${encodeURIComponent(p.subject || "Your Portfolio Inquiry")}"
         style="display:block;background:linear-gradient(135deg,#1a56db 0%,#2563eb 100%);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:16px 36px;border-radius:10px;text-align:center;letter-spacing:0.3px;">
        &#x21A9;&nbsp;&nbsp;Reply to ${p.name.split(" ")[0]}
      </a>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="padding:20px 28px;background:#f8faff;border-top:1px solid #e8eef8;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" width="38%">${logoImg(38, 13, 10)}</td>
        <td align="center" valign="middle" width="28%">
          <table cellpadding="0" cellspacing="0" align="center"><tr>
            ${socialCircle("https://www.linkedin.com/in/eckysaroyd/", "in",  "#2563eb")}
            ${socialCircle("https://github.com/eckysaroyd",           "GH",  "#334155")}
            ${socialCircle("https://twitter.com/eckysaroyd",          "X",   "#334155")}
            ${socialCircle(BASE,                                       "&#x1F310;", "#334155")}
          </tr></table>
        </td>
        <td align="right" valign="middle" width="34%">
          <p style="margin:0 0 5px;font-size:11px;color:#94a3b8;text-align:right;line-height:1.5;">This message was sent from your<br>portfolio contact form.</p>
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

    <!-- HEADER: EN wordmark logo + badge -->
    <tr><td style="padding:20px 28px;background:#ffffff;border-bottom:1px solid #f0f4ff;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle">${logoImg(50, 15, 11)}</td>
        <td align="right" valign="middle">
          <span style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600;color:#16a34a;white-space:nowrap;">&#x2713;&nbsp; Message Confirmed</span>
        </td>
      </tr></table>
    </td></tr>

    <!-- FULL-WIDTH BANNER with background image -->
    <tr><td style="padding:0;background-color:#1a56db;">
      <table width="100%" cellpadding="0" cellspacing="0"
             style="background-image:url('${BASE}/images/email-banner.png');background-size:cover;background-position:center;background-color:#1a56db;">
        <tr>
          <td style="padding:40px 0 40px 36px;vertical-align:middle;width:55%;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);font-weight:700;">Message Confirmed</p>
            <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#ffffff;line-height:1.25;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Got your message,<br>${firstName}!</h1>
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.90);line-height:1.65;">I&apos;ll review your message and<br>get back to you within 24 hours.</p>
          </td>
          <td style="width:45%;">&nbsp;</td>
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
    <tr><td style="padding:20px 28px;background:#f8faff;border-top:1px solid #e8eef8;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" width="38%">${logoImg(38, 13, 10)}</td>
        <td align="center" valign="middle" width="28%">
          <table cellpadding="0" cellspacing="0" align="center"><tr>
            ${socialCircle("https://www.linkedin.com/in/eckysaroyd/", "in",  "#2563eb")}
            ${socialCircle("https://github.com/eckysaroyd",           "GH",  "#334155")}
            ${socialCircle("https://twitter.com/eckysaroyd",          "X",   "#334155")}
            ${socialCircle(BASE,                                       "&#x1F310;", "#334155")}
          </tr></table>
        </td>
        <td align="right" valign="middle" width="34%">
          <p style="margin:0 0 5px;font-size:11px;color:#94a3b8;text-align:right;line-height:1.5;">This is an automated reply confirming<br>we received your message.</p>
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
