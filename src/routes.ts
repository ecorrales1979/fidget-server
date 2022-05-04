import express from "express";

import { transport } from "./mail";
import { prisma } from "./prisma";

export const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Server is on!");
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: { address: "support@fidgetmail.com", name: "Fidget Team" },
    to: { address: "ecorrales1979@gmail.com", name: "Eduardo Corrales" },
    subject: "New feedback",
    html: [
      `<div style="font-family:sans-serif;font-size:16px;color:#111">`,
      `  <p>Feedback type: ${type}</p>`,
      `  <p>Comment: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json(feedback);
});
