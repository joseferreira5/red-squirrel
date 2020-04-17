import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Layout from "./shared/Layout";

import { createItem } from "../services/items";
import "./ItemCreate.css";

class ItemCreate extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        name: "",
        description: "",
        imgURL: "",
        preferredQty: "",
        onHandQty: "",
      },
      created: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      item: {
        ...this.state.item,
        [name]: value,
      },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const created = await createItem(this.state.item, this.props.user.id);
    this.setState({ created });
  };

  render() {
    const { item, created } = this.state;

    if (created) {
      return <Redirect to={"/items"} />;
    }
    return (
      <Layout user={this.props.user}>
        <div className="create-item-form">
          <form className="create-form-item" onSubmit={this.handleSubmit}>
            <div className="all-item-info">
              <input
                className="input-name-item"
                placeholder="Name"
                value={item.name}
                name="name"
                required
                autoFocus
                onChange={this.handleChange}
              />
              <input
                className="input-prefQty-item"
                placeholder="Preferred Quantity"
                value={item.preferredQty}
                name="preferredQty"
                required
                onChange={this.handleChange}
              />
              <input
                className="input-onHandQty-item"
                placeholder="Quantity on Hand"
                value={item.onHandQty}
                name="onHandQty"
                required
                onChange={this.handleChange}
              />
              <textarea
                className="textarea-description-item"
                rows={5}
                placeholder="Description"
                value={item.description}
                name="description"
                required
                onChange={this.handleChange}
              />
              <input
                className="input-image-link-item"
                placeholder="Image Link"
                value={item.imgURL}
                name="imgURL"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="submit-button-item">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ItemCreate;
