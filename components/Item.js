import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import Image from "next/image";

import classes from "./Item.module.scss";

function List({ img, header, subHeader }) {
  return (
      <Card className={`col-sm-6 col-md-4 col-lg-3  ${classes.card}`}>
        <div className={classes["image-box"]}>
          <Image
            alt={`Поддон ${header} ${subHeader}`}
            src={img}
            style={classes["item-image"]}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <CardTitle className={classes.header}>
          {header.replace(/&nbsp;/g, "\u00A0")}
        </CardTitle>
        <CardText className={classes["sub-header"]}>
          {subHeader.replace(/&nbsp;/g, "\u00A0")}
        </CardText>
      </Card>
  );
}

export default List;
