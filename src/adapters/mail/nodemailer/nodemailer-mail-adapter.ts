import { createTransport } from "nodemailer";
import { env } from "process";

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = createTransport({
  host: env.MAIL_HOST,
  port: parseInt(env.MAIL_PORT ?? ""),
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  constructor() {}

  async sendMail({ subject, body, from, to }: SendMailData) {
    await transport.sendMail({
      from,
      to,
      subject,
      html: body,
    });
  }
}
