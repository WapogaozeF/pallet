import React, { Fragment } from "react";

import Item from "./Item";

import classes from "./List.module.scss";

function List({ header, pallets }) {
  const palletsList = [];
  for (let pallet in pallets) {
    palletsList.push(pallets[pallet]);
  }
  const sortedPallets = palletsList.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
  const list = sortedPallets.map((pallet) => {
    const { img, header, subHeader, order } = pallet;
    return <Item img={img} header={header} subHeader={subHeader} key={order} />;
  });

  return (
    <div className={`${classes.list} container`}>
      <h2 className={classes.header}>{header}</h2>
      <div className="row">{list}</div>
    </div>
  );
}

export default List;
