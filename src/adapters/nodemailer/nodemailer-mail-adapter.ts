import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9fc50e5f38a5ba',
    pass: '0c948e7bb1aedd',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback Widget <oi@feedbackwidget.com>',
      to: 'Juan Victor <jnvleite@gmail.com>',
      subject,
      html: body,
    });
  }
}
