import React from 'react';
import { Link } from 'react-router-dom';

import flag from '../images/flag.png';
import mascot from '../images/mascot_over_red.png';
import './Item.css';

const Item = (props) => {
  const isCritical = (onHandQty, preferredQty) => {
    if ((onHandQty / preferredQty) * 100 <= 25) {
      return true;
    }
  };

  return (
    <>
      <Link className="item" to={`/items/detail/${props.itemId}`}>
        {isCritical(props.onHandQty, props.preferredQty) ? (
          <img className="flag" src={flag} alt="critical flag" />
        ) : (
          false
        )}
        <img
          className="item-image"
          src={props.imgURL || mascot}
          alt={props.name}
        />
        <div className="item-name">{props.name}</div>
        <div className="onhand-qty-header">On Hand Quantity</div>
        <div className="onhand-qty">{props.onHandQty}</div>
      </Link>
    </>
  );
};

export default Item;
