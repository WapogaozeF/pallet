import React  from "react";
import classes from "./ServiceItem.module.scss";

function ServiceItem(props) {
  const { imageSrc, header, text, theme } = props;

  return (
    <div className="container">
      <div>
        <img src={imageSrc} alt={header} className={classes.image} />
      </div>
      <div>
        <h3 className={classes.header}>{header}</h3>
        <p
          className={`${classes.text} ${
            theme == "dark" ? classes["text-alt"] : ""
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default ServiceItem;
