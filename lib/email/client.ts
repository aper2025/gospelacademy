import nodemailer from 'nodemailer'

const smtpHost = process.env.SMTP_HOST
const smtpPort = parseInt(process.env.SMTP_PORT ?? '465')
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

// Nodemailer transporter — returns null if SMTP not configured (graceful degradation)
export const transporter = smtpHost && smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'The Gospel Academy <support@thegospelacademy.com>'
