interface MailContact {
  name: string;
  address: string;
}

export interface SendMailData {
  from: string | MailContact;
  to: string | MailContact;
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
