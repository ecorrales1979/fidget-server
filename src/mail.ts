import { createTransport } from "nodemailer";

export const transport = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d8e166951f5108",
    pass: "22f8cb45ba589b",
  },
});
