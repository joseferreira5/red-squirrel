import React, { Component } from 'react';
import './ItemDetail.css';
import Layout from './shared/Layout';
import { getItem, deleteItem } from '../services/items';
import { Link } from 'react-router-dom';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: '',
        description: '',
        imgURL: '',
      },
    };
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const product = await getItem(id);
    this.setState({ product });
  }

  render() {
    const { product } = this.state;
    return (
      <Layout user={this.props.user}>
        <div className="product-detail">
          <img
            className="product-detail-image"
            src={product.imgURL}
            alt={product.name}
          />
          <div className="detail">
            <div className="name">{product.name}</div>
            <div className="price">{`$${product.price}`}</div>
            <div className="description">{product.description}</div>
            <div className="button-container">
              <button className="edit-button">
                <Link
                  className="edit-link"
                  to={`/products/${product._id}/edit`}
                >
                  Edit
                </Link>
              </button>
              <button
                className="delete-button"
                onClick={() => deleteItem(product._id)}
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
