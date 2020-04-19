import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Layout from './shared/Layout';

import { getItem, deleteItem } from '../services/items';
import './ItemDetail.css';
import mascot from "../Images/MascotWAppReds.png"

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
      deleted: false,
    };
  }

  async componentDidMount() {
    let { itemId } = this.props.match.params;
    const item = await getItem(itemId);
    this.setState({ item });
  }

  handleDelete = (itemId) => {
    deleteItem(itemId);
    this.setState({ deleted: true });
  };

  render() {
    const { item, deleted } = this.state;
    const { user } = this.props;

    if (deleted) {
      return <Redirect to={'/items'} />;
    }

    return (
      <Layout user={user}>
        <div className="item-detail">
          <img
            className="item-detail-image"
            src={item.imgURL || mascot}
            alt={item.name}
          />
          <div className="detail">
            <div className="name">{item.name}</div>
            <div className="preferredQty">Preferred: {item.preferredQty}</div>
            <div className="onHandQty">On hand: {item.onHandQty}</div>
            <div className="description">{item.description}</div>
            <div className="button-container">
              <button className="edit-button">
                <Link className="edit-link" to={`/items/${item._id}/edit`}>
                  Edit
                </Link>
              </button>
              <button
                className="delete-button"
                onClick={() => this.handleDelete(item._id)}
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
