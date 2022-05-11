import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.execute({ comment: 'Test comment', type: 'BUG', screenshot: 'data:image/ksjgajsdgjg' }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({ comment: 'Test comment', type: '', screenshot: 'data:image/ksjgajsdgjg' }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({ comment: '', type: 'BUG', screenshot: 'data:image/ksjgajsdgjg' }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({ comment: 'Test comment', type: 'BUG', screenshot: '123' }),
    ).rejects.toThrow();
  });
});
