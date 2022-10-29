const mailjet = require("node-mailjet").apiConnect(
  "a065e45c2d73e890ec8b6573e9c3898b",
  "53821fbb04f9bf35080f998cb5af4e10"
);

const sendMail = (email, name, subject, message, html) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "dicky2ux@gmail.com",
          Name: "Dicky",
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: html,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = { sendMail };
