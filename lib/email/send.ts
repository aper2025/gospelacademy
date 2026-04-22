import { transporter, FROM_EMAIL } from './client'

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

/**
 * Send an email via SMTP (Nodemailer). Fails silently if SMTP is not configured
 * (e.g., missing SMTP_HOST). This ensures the app works without
 * email in dev/test environments.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  if (!transporter) {
    console.warn('[email] SMTP not configured — skipping email to', to)
    return false
  }

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    return true
  } catch (err) {
    console.error('[email] Failed to send:', err)
    return false
  }
}
