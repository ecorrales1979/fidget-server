import { MailAdapter } from "../adapters/mail/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required");

    if (!comment) throw new Error("Comment is required");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      from: { address: "support@fidgetmail.com", name: "Fidget Team" },
      to: { address: "ecorrales1979@gmail.com", name: "Eduardo Corrales" },
      subject: "New feedback",
      body: [
        `<div style="font-family:sans-serif;font-size:16px;color:#111">`,
        `  <p>Feedback type: ${type}</p>`,
        `  <p>Comment: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
