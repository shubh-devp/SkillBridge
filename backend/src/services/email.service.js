const env = require('../config/env');
const logger = require('../utils/logger');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (env.smtp.host && env.smtp.user && env.smtp.pass) {
    const nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }

  return transporter;
};

const sendEmail = async (options) => {
  const { to, subject, html, text } = options;

  const transport = getTransporter();

  if (!transport) {
    logger.info('--- EMAIL LOG (SMTP not configured) ---');
    logger.info(`To: ${to}`);
    logger.info(`Subject: ${subject}`);
    logger.info(`Body: ${html || text}`);
    logger.info('--- END EMAIL LOG ---');
    return;
  }

  try {
    const info = await transport.sendMail({
      from: `"SkillBridge" <${env.smtp.user}>`,
      to,
      subject,
      html,
      text,
    });
    logger.info(`Email sent: ${info.messageId} -> ${to}`);
  } catch (err) {
    logger.error(`Failed to send email to ${to}: ${err.message}`);
  }
};

const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Welcome to SkillBridge!</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for joining SkillBridge. We're excited to help you on your learning journey.</p>
      <p>Start exploring courses and take the first step toward your goals.</p>
      <br/>
      <p>Best regards,<br/>The SkillBridge Team</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Welcome to SkillBridge!',
    html,
  });
};

const sendPasswordResetEmail = async (user, resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Password Reset Request</h2>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset. Click the link below to reset your password. This link is valid for 10 minutes.</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #ffffff; text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
      </p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>Best regards,<br/>The SkillBridge Team</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset - SkillBridge',
    html,
  });
};

const sendEnrollmentConfirmation = async (user, course) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4F46E5;">Enrollment Confirmed!</h2>
      <p>Hi ${user.name},</p>
      <p>You have successfully enrolled in <strong>${course.title}</strong>.</p>
      <p>Get started with your learning journey now.</p>
      <br/>
      <p>Best regards,<br/>The SkillBridge Team</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: `Enrolled: ${course.title}`,
    html,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendEnrollmentConfirmation,
};
