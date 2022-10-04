import React from "react";
import Link from "next/link";

import classes from "./Logo.module.scss";

function Logo() {
  return (
      <Link href="#home">
        <a className={classes.link}>
          <div className={classes.logo}>
            <img
              src="./logo.svg"
              alt="Логотип группы компаний «Уфимская паллетная компания»"
              className={classes.image}
            />
            <h2 className={`${classes["header"]}`} id="home">
              ГК «Уфимская
              <br />
              паллетная компания»
            </h2>
            <h1 className={`${classes["sub-header"]}`}>
              {"ГК «Уфимская паллетная\u00A0компания»"}
            </h1>
          </div>
        </a>
      </Link>
  );
}

export default Logo;
