export declare class MailerService {
    private transporter;
    private logger;
    constructor();
    sendMail(opts: {
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<any>;
    sendPasswordReset(toEmail: string, rawToken: string): Promise<any>;
}
