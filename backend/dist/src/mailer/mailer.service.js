"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MailerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
let MailerService = MailerService_1 = class MailerService {
    transporter;
    logger = new common_1.Logger(MailerService_1.name);
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        this.transporter.verify().catch((err) => {
            this.logger.warn('Mailer verify failed (app will still run): ' + err.message);
        });
    }
    async sendMail(opts) {
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
        }
        catch (err) {
            this.logger.error('Failed to send email: ' + (err?.message ?? String(err)));
            throw err;
        }
    }
    async sendPasswordReset(toEmail, rawToken) {
        const frontend = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
        const resetUrl = `${frontend}/reset?token=${encodeURIComponent(rawToken)}`;
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
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = MailerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);
//# sourceMappingURL=mailer.service.js.map