import React, { Component } from "react";
import "./ItemDetail.css";
import Layout from "./shared/Layout";
import { getItem, deleteItem } from "../services/items";
import { Link } from "react-router-dom";

class ItemDetail extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        name: "",
        description: "",
        imgURL: "",
        preferredQty: "",
        onHandQty: "",
        _id: ""
      }
    };
  }

  async componentDidMount() {
    let { userId, itemId } = this.props.match.params;
    console.log(itemId);
    const item = await getItem(userId, itemId);
    this.setState({ item });
  }

  render() {
    const { item } = this.state;
    return (
      <Layout user={this.props.user}>
        <div className="item-detail">
          <img
            className="item-detail-image"
            src={item.imgURL}
            alt={item.name}
          />
          <div className="detail">
            <div className="name">{item.name}</div>
            <div className="onHandQty">{item.onHandQty}</div>
            <div className="preferredQty">{item.preferredQty}</div>
            <div className="description">{item.description}</div>
            <div className="button-container">
              <button className="edit-button">
                <Link className="edit-link" to={`/items/${item._id}/edit`}>
                  Edit
                </Link>
              </button>
              <button
                className="delete-button"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ItemDetail;
