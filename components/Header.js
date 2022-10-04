import React from "react";
import Link from "next/link";
import { Nav } from "reactstrap";
import Script from "next/script";
import Logo from "./Logo";

import classes from "./Header.module.scss";

function Header() {
  return (
    <div className={`${classes.nav} navbar navbar-expand-lg`}>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></Script>
      <div className={`${classes.logo} container`}>
        <div className="navbar-brand">
          <Logo />
        </div>
        <button
          className={`navbar-toggler ${classes.toggle}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className={classes.icon}>
            <img src="./humburger.svg" alt="Кнока меню" />
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="#service">
                <a className={`nav-link ${classes.link}`}>Услуги</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#pallets">
                <a className={`nav-link ${classes.link}`}>Поддоны</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#about-us">
                <a className={`nav-link ${classes.link}`}>О нас</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#contacts">
                <a className={`nav-link ${classes.link}`}>Контакты</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
