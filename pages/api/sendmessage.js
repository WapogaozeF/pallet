import { createTransport } from "nodemailer";

async function sendEmail(req, res) {
  let { phone, name, email, message } = req.body;
  let regexpPhone = new RegExp(
    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/g
  );
  let regexpEmail = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  );

  let testing = {
    phone: false,
    phoneIsCorrect: false,
    email: false,
    emailIsCoorect: false,
  };

  if (phone !== "") {
    testing.phone = true;
    if (regexpPhone.test(phone)) {
      testing.phoneIsCorrect = true;
    }
  }
  if (email !== "") {
    testing.email = true;
    if (regexpEmail.test(email)) {
      testing.emailIsCoorect = true;
    }
  }
  if (
    testing.phone !== testing.phoneIsCorrect &&
    testing.email !== testing.emailIsCoorect
  ) {
    return res.status(400).json({ success: false, error: "Incorrect data" });
  }
  if (!(regexpPhone.test(phone) || regexpEmail.test(email)) && name === "") {
    return res.status(400).json({ success: false, error: "Incorrect data" });
  }

  let transporter = createTransport({
    service: "mail.ru",
    host: "smtp.mail.ru",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let html = `<h1>Новая заявка</h1><br />
    <p>Имя: ${name}</p><br />
    ${email ? `<a href="mailto:${email}">Email: ${email}</a><br />` : ""}
    ${phone ? `<a href="tel:${phone}">Номер: ${phone}</a><br />` : ""}
    ${message ? `<p>Сообщение: ${message}</p>` : ""}
  `;

  await transporter.sendMail({
    to: "contacts@palletufa.ru",
    from: `"Оповещение о заявке" ${process.env.EMAIL}`,
    subject: "Новая заявка",
    text: "Новая заявка",
    html,
  });
  return res.status(200).json({ success: true });
}

export default sendEmail;
