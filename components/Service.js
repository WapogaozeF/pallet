import React from "react";
import ServiceItem from "./ServiceItem";

import classes from "./Service.module.scss";

function Service({ services }) {
  let palletsList = [];
  for (let service in services) {
    palletsList.push(services[service]);
  }
  const sortedServices = palletsList.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
  const servicesList = sortedServices.map((service) => {
    let { imageSrc, header, text, theme, order } = service;
    let style = `${
      theme === "dark" ? classes["bg-dark"] : ""
    } col-lg-4 text-center`;

    return (
      <div className={style} key={order}>
        <ServiceItem
          imageSrc={imageSrc}
          header={header}
          text={text}
          theme={theme}
        />
      </div>
    );
  });

  return <div className={`row ${classes.service}`}>{servicesList}</div>;
}

export default Service;
