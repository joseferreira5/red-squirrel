<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import Flag from "../Images/flag.png";
import './Item.css';




const Item = (props) => {

  const isCritical = (onHandQty, preferredQty) => {
    if(((onHandQty/preferredQty)*100) <= 25 ) {
      return true;
    }
  }
  return (
    <>
      <Link className="item" to={`/items/detail/${props.itemId}`}>
        { isCritical(props.onHandQty, props.preferredQty) ? <img className="flag" src={Flag}/>  : false} 
        <img className="item-image" src={props.imgURL} alt={props.name} />
=======
import React from "react";
import { Link } from "react-router-dom";
import mascot from "../Images/MascotWAppReds.png";

import "./Item.css";

const Item = props => {
  return (
    <>
      <Link className="item" to={`/items/detail/${props.itemId}`}>
        <img className="item-image" src={props.imgURL || mascot} alt={""} />
>>>>>>> a148bbdb6999b1549d5ee1e9204979dd53c4ca0a
        <div className="item-name">{props.name}</div>
        <div className="onhand-qty-header">On Hand Quantity</div>
        <div className="onhand-qty">{props.onHandQty}</div>
        <div className="preferred-qty">{props.preferredQty}</div>
      </Link>
    </>
  );
};

export default Item;

