import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f4f7;
          color: #51545e;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          width: 100% !important;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 40px;
          text-align: center;
        }
        .header {
          margin-bottom: 30px;
        }
        .header h1 {
          color: #333333;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
          margin-top: 10px;
        }
        .code-container {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .code {
          color: #111827;
          font-family: 'Courier New', Courier, monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 10px;
          margin: 0;
        }
        .footer {
          margin-top: 30px;
          color: #9ca3af;
          font-size: 12px;
        }
        .warning {
          color: #10b981; /* Changed to a success/info color for verification */
          font-size: 14px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>Verify Your Email Address</h1>
            <p class="subtitle">Use the code below to complete your registration</p>
          </div>
          
          <div class="code-container">
            <p class="code">${token}</p>
          </div>
          
          <p>This code will expire in 1 hour.</p>
          <p class="warning">Thank you for joining us!</p>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Saasify. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Saasify" <noreply@saasify.com>',
    to: email,
    subject: 'Confirm your email address',
    html,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f4f7;
          color: #51545e;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          width: 100% !important;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 40px;
          text-align: center;
        }
        .header {
          margin-bottom: 30px;
        }
        .header h1 {
          color: #333333;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 16px;
          margin-top: 10px;
        }
        .code-container {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
        }
        .code {
          color: #111827;
          font-family: 'Courier New', Courier, monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 10px;
          margin: 0;
        }
        .footer {
          margin-top: 30px;
          color: #9ca3af;
          font-size: 12px;
        }
        .warning {
          color: #ef4444;
          font-size: 14px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>Password Reset Request</h1>
            <p class="subtitle">Use the code below to reset your password</p>
          </div>
          
          <div class="code-container">
            <p class="code">${token}</p>
          </div>
          
          <p>This code will expire in 1 hour.</p>
          <p class="warning">If you didn't request this, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Saasify. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Saasify" <noreply@saasify.com>',
    to: email,
    subject: 'Reset your password',
    html,
  });
};