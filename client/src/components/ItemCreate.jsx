import React, { Component } from 'react';
import './ItemCreate.css';
import Layout from './shared/Layout';
import { Redirect } from 'react-router-dom';
import { createItem } from '../services/items';

class ItemCreate extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        name: '',
        description: '',
        imgURL: '',
        preferredQty: '',
        onHandQty: '',
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
    const created = await createItem(this.state.item, this.props.user._id);
    this.setState({ created });
  };

  render() {
    const { item, created } = this.state;

    if (created) {
      return <Redirect to={`/items`} />;
    }
    return (
      <Layout user={this.props.user}>
        <form className="create-form" onSubmit={this.handleSubmit}>
          <input
            className="input-name"
            placeholder="Name"
            value={item.name}
            name="name"
            required
            autoFocus
            onChange={this.handleChange}
          />
          <input
            className="input-prefQty"
            placeholder="Preferred Quantity"
            value={item.preferredQty}
            name="preferredQty"
            required
            onChange={this.handleChange}
          />
          <input
            className="input-onHandQty"
            placeholder="Quantity on Hand"
            value={item.onHandQty}
            name="onHandQty"
            required
            onChange={this.handleChange}
          />
          <textarea
            className="textarea-description"
            rows={10}
            placeholder="Description"
            value={item.description}
            name="description"
            required
            onChange={this.handleChange}
          />
          <input
            className="input-image-link"
            placeholder="Image Link"
            value={item.imgURL}
            name="imgURL"
            onChange={this.handleChange}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </Layout>
    );
  }
}

export default ItemCreate;
