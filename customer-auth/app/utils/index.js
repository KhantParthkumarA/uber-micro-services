"use strict";
import Mailgun from "mailgun-js";

const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  
  export function sendMail({
    from = process.env.EMAIL_SENDER,
    to,
    subject,
    message,
    template = undefined,
    variables = {},
  }) {
    return new Promise((ful, rej) => {
      const payload = { from, to, subject };
      if (template) {
        payload.template = template;
        for (let variable in variables)
          payload[`v:${variable}`] = variables[variable];
      } else {
        payload.html = message;
      }
  
      mailgun.messages().send(payload, (err, body) => {
        if (err) {
          console.log("============email error===========");
          console.log(err);
          console.log("============email error===========");
          rej(new Error("Mail sending failed"));
        }
        ful(true);
      });
    });
  }