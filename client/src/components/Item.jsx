import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <>
      <Link className="item" to={`/items/${props._id}`}>
        <img className="item-image" src={props.imgURL} alt={props.name} />
        <div className="item-name">{props.name}</div>
        <div className="onhand-qty">{props.onHandQty}</div>
      </Link>
    </>
  );
};

export default Item;
