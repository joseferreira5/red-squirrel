import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from './shared/Layout';

import { getItem, deleteItem } from '../services/items';
import './ItemDetail.css';

class ItemDetail extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        name: '',
        description: '',
        imgURL: '',
        preferredQty: '',
        onHandQty: '',
        _id: '',
      },
    };
  }

  async componentDidMount() {
    let { userId, itemId } = this.props.match.params;
    const item = await getItem(userId, itemId);
    this.setState({ item });
  }

  handleDelete = (itemId) => {
    deleteItem(itemId);
  };

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
                onClick={this.handleDelete(item._id)}
              >
                <Link
                  className="edit-link"
                  to={`/items/${this.props.user._id}`}
                >
                  Delete
                </Link>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ItemDetail;
