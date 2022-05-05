import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "Something",
        screenshot: "data:image/png;base64,adsfgopHAPDGOIG",
      })
    ).resolves.not.toThrow();
  });
});
