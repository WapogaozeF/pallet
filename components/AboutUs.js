import React from "react";

import classes from "./AboutUs.module.scss";

function AboutUs({ text }) {
  return (
    <div className={classes.aboutus + " row justify-content-center"}>
      <div className="col-lg-10 col-xl-8">
        <h2 className={classes.h2}>О нас</h2>
        <div className={classes["p-container"]}>
          <p>
            {text
              .replace(/<br>/g, "\r\n")
              .replace(/&nbsp;/g, "\u00A0")
              .replace(/&laquo;/g, "\u00AB")
              .replace(/&raquo;/g, "\u00BB")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
