import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const sut = () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
  );

  return { submitFeedback };
};

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    const { submitFeedback } = sut();

    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "Something",
        screenshot: "data:image/png;base64,adsfgopHAPDGOIG",
      })
    ).resolves.not.toThrow();
  });

  it("should reject with wrong screenshot format", async () => {
    const { submitFeedback } = sut();

    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "Something",
        screenshot: "picture.png",
      })
    ).rejects.toThrow();
  });

  it("should reject with empty type", async () => {
    const { submitFeedback } = sut();

    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Something",
      })
    ).rejects.toThrow();
  });

  it("should reject with empty comment", async () => {
    const { submitFeedback } = sut();

    await expect(
      submitFeedback.execute({
        type: "bug",
        comment: "",
      })
    ).rejects.toThrow();
  });
});
