// function to send verification mail to new e-mails 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailTemplate = require('../templates/email.templates');

// function to detect email type, set up the email options and content 
exports.setUpMails = async (emailType, emailCredentials) => {

  let mailOptions = {
    from: emailTemplate.from,
    to: `${emailCredentials.email}`,
  };

  if (emailType === "verificationMail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = emailTemplate.verificationMail.subject;
    mailOptions['text'] = emailTemplate.verificationMail.text;
    mailOptions['html'] = `<b> <a href= https://internship-assessment.onrender.com/user/verifyAccount?token=${token} target= '_blank'>verify</b>`
  }

  else if (emailType === "forgetPasswordEmail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = emailTemplate.forgetPasswordEmail.subject;
    mailOptions['text'] = emailTemplate.forgetPasswordEmail.text;
    mailOptions['html'] = `<b> <a href= https://hivo.vercel.app/reset-password/?token=${token} target= '_blank'>reset password</b>`;
  }

  let result = await sendEmails(mailOptions);
  return result;

};

// function to send emails using node mailer
const sendEmails = async (mailOptions) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.PASS}`
      },
    });

    let obj = {
      success: true,
      statusCode: 200,
      message: "success and your email was sent !"
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        obj.success = false,
          obj.statusCode = 400,
          obj.message = "could not send your email"
      }
    })

    return obj;
  }
  catch (err) {
    console.log(err);
    return {
      success: false,
      statusCode: 500,
      message: "unexpected error"

    }

  }
};