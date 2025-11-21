
export const sendVerificationEmail = async (email: string, token: string) => {
  // In a real application, you would use a service like Resend or Nodemailer here.
  console.log(`
    ----------------------------------------
    VERIFICATION EMAIL
    To: ${email}
    Code: ${token}
    ----------------------------------------
  `);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  // In a real application, you would use a service like Resend or Nodemailer here.
  console.log(`
    ----------------------------------------
    PASSWORD RESET EMAIL
    To: ${email}
    Code: ${token}
    ----------------------------------------
  `);
};
