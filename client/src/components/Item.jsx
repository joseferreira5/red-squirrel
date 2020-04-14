import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <>
      <Link className="product" to={`/products/${props._id}`}>
        <img className="product-image" src={props.imgURL} alt={props.name} />
        <div className="product-name">{props.name}</div>
        <div className="price">{`$${props.price}`}</div>
      </Link>
    </>
  );
};

export default Item;
