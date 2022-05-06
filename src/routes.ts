import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '9fc50e5f38a5ba',
    pass: '0c948e7bb1aedd',
  },
});

routes.post('/feedbacks', async (req, res) => {
  const {
    type,
    comment,
    screenshot,
  } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Equipe Feedback Widget <oi@feedbackwidget.com>',
    to: 'Juan Victor <jnvleite@gmail.com>',
    subject: 'Novo feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return res.send(res.status(201).json({ data: feedback }));
});
