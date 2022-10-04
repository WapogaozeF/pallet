import React, { Fragment, useRef, useState } from "react";
import classes from "./Footer.module.scss";
import { BrowserView, MobileView } from "react-device-detect";

function Footer({ contacts }) {
  const [sended, setSended] = useState(false);
  const [error, setError] = useState({ phone: false, email: false });
  const nameInput = useRef(null);
  const messageInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const form = useRef("");
  const {
    telegram,
    whatsapp,
    email,
    address,
    phone,
    addressLink,
    addressCoordinates,
  } = contacts;
  const sortedPhones = phone.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
  const phonesList = sortedPhones.map((phoneItem) => {
    if (!!phone) {
      const { number, clearupNumber, order } = phoneItem;
      return (
        <Fragment key={order}>
          <a href={`tel:${number.split("'").join("")}`}>
            {clearupNumber.split("'").join("")}
          </a>
          <br />
        </Fragment>
      );
    }
  });

  let regexpPhone = new RegExp(
    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/g
  );

  let regexpEmail = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  );
  const phoneChangeHandler = (event) => {
    setError({ ...error, phone: false });
  };

  const emailChangeHandler = (event) => {
    setError({ ...error, email: false });
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    let emailIsValid = regexpEmail.test(emailInput.current.value);
    let phoneIsValid = regexpPhone.test(phoneInput.current.value);

    let phoneTrust = phoneInput.current.value === "" || phoneIsValid;
    let emailTrust = emailInput.current.value === "" || emailIsValid;
    let emailOrPhoneNotNull =
      phoneInput.current.value !== "" || emailInput.current.value !== "";

    let trust = phoneTrust && emailTrust && emailOrPhoneNotNull;
    if (!phoneTrust) {
      setError({ ...error, phone: true });
    }
    if (!emailTrust) {
      setError({ ...error, email: true });
    }
    if (trust) {
      const res = await fetch("/api/sendmessage", {
        body: JSON.stringify({
          phone: phoneInput.current.value,
          name: nameInput.current.value,
          message: messageInput.current.value,
          email: emailInput.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        if (!regexpPhone.test(phoneInput.current.value)) {
          setError({ ...error, phone: true });
        }
        if (!regexpEmail.test(emailInput.current.value)) {
          setError({ ...error, email: true });
        }
        return;
      }
      form.current.reset();
      setError({ email: false, phone: false });
      setSended(true);
      setTimeout(() => {
        setSended(false);
      }, 3000);
    } else {
      if (!regexpPhone.test(phoneInput.current.value)) {
        setError({ ...error, phone: true });
      }
      if (!regexpEmail.test(emailInput.current.value)) {
        setError({ ...error, email: true });
      }
    }
  };

  return (
    <footer className={classes.footer} id="contacts">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className={classes.header}>Контакты</h2>
            <p className={classes.phone}>{phonesList}</p>
            <div className={classes["address-block"]}>
              <MobileView>
                <a
                  href={`geo:${addressCoordinates}`}
                  className={classes.address}
                >
                  {address.replace(/&nbsp/g, "\u00A0")}
                </a>
              </MobileView>
              <BrowserView>
                <a
                  href={addressLink}
                  className={classes.address}
                  target="_blank"
                >
                  {address.replace(/&nbsp/g, "\u00A0")}
                </a>
              </BrowserView>
            </div>
            <p className={classes.email}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <div className={classes.messengers}>
              <a
                href={`https://t.me/${telegram.split("'").join("")}`}
                target="_blank"
              >
                <img src="./telegram.svg" alt="Логотип телеграма" />
              </a>
              <a
                href={`https://wa.me/${whatsapp.split("'").join("")}`}
                target="_blank"
              >
                <img src="./whatsapp.svg" alt="Логотип WhatsApp" />
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className={classes.header}>Связаться с нами</h2>
            <form onSubmit={onSubmit} ref={form}>
              <input
                className={classes.input}
                placeholder="Имя"
                type="text"
                required
                ref={nameInput}
              />
              {<p className={classes.label}>Введите номер и/или email.</p>}
              <input
                className={`${classes.input} ${error.phone && classes.invalid}`}
                placeholder="Номер"
                type="text"
                ref={phoneInput}
                aria-invalid={error.phone ? "true" : "false"}
                onChange={phoneChangeHandler}
              />
              <input
                className={`${classes.input} ${error.email && classes.invalid}`}
                placeholder="Email"
                type="text"
                ref={emailInput}
                aria-invalid={error.email ? "true" : "false"}
                onChange={emailChangeHandler}
              />
              <textarea
                className={classes.textarea}
                placeholder="Сообщение"
                ref={messageInput}
              />
              <div className={classes["message-block"]}>
                <button
                  className={classes.button}
                  type="submit"
                  disabled={sended}
                >
                  Отправить
                </button>
                <p
                  className={`${classes.message} ${
                    !sended && classes["message-none"]
                  }`}
                >
                  Сообщение отправлено
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
