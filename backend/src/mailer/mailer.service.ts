// backend/src/mailer/mailer.service.ts
import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailerService.name);

  constructor() {
    // transporter reads env vars
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Optionally verify transporter at startup (comment out if you don't want app to fail)
    this.transporter.verify().catch((err) => {
      this.logger.warn(
        'Mailer verify failed (app will still run): ' + err.message,
      );
    });
  }

  async sendMail(opts: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    const from = process.env.EMAIL_FROM || 'no-reply@localhost';
    const payload = {
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    };
    try {
      const res = await this.transporter.sendMail(payload);
      this.logger.log(`Email sent to ${opts.to} (messageId=${res.messageId})`);
      return res;
    } catch (err: any) {
      this.logger.error(
        'Failed to send email: ' + (err?.message ?? String(err)),
      );
      throw err;
    }
  }

  async sendPasswordReset(toEmail: string, rawToken: string) {
    const frontend = (
      process.env.FRONTEND_URL || 'http://localhost:3000'
    ).replace(/\/$/, '');
    const resetUrl = `${frontend}/reset?token=${encodeURIComponent(rawToken)}`; // client reset page expects token query
    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;">
        <h2 style="color:#0f172a">Reset your Teamflow password (one time valid and expires in 1 hour)</h2>
        <p>If you requested a password reset, click the button below:</p>
        <p><a href="${resetUrl}" style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;">Reset password</a></p>
        <p>If the button doesn't work, copy & paste this URL into your browser:</p>
        <pre style="background:#f3f4f6;padding:8px;border-radius:6px;overflow:auto">${resetUrl}</pre>
        <hr/>
        <p style="font-size:12px;color:#6b7280">If you didn't request this, you can ignore this message.</p>
      </div>
    `;
    return this.sendMail({
      to: toEmail,
      subject: 'Teamflow — Reset your password',
      html,
      text: `Reset your password: ${resetUrl}`,
    });
  }
}
