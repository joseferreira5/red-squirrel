import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from './shared/Layout';

import { getItem, updateItem } from '../services/items';
import './ItemEdit.css';

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: '',
        description: '',
        imgURL: '',
        preferredQty: '',
        onHandQty: '',
      },
      updated: false,
    };
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const item = await getItem(id);
    this.setState({ item });
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
    let { id } = this.props.match.params;
    const updated = await updateItem(id, this.state.item);
    this.setState({ updated });
  };

  render() {
    const { item, updated } = this.state;

    if (updated) {
      return <Redirect to={`/items/detail/${this.props.match.params.id}`} />;
    }

    return (
      <Layout user={this.props.user}>
      <div className="item-container">
        <div className="item-edit">
          <div className="image-container">
            <img
              className="edit-item-image"
              src={item.imgURL}
              alt={item.name}
            />
            <form onSubmit={this.handleSubmit}>
              <input
                className="edit-input-image-link"
                placeholder="Image Link"
                value={item.imgURL}
                name="imgURL"
                required
                onChange={this.handleChange}
              />
            </form>
          </div>
          <form className="edit-form" onSubmit={this.handleSubmit}>
            <input
              className="input-name"
              placeholder="Name"
              value={item.name || ''}
              name="name"
              required
              autoFocus
              onChange={this.handleChange}
            />

            <textarea
              className="textarea-description"
              rows={1}
              cols={1}
              placeholder="Description"
              value={item.description}
              name="description"
              required
              onChange={this.handleChange}
            />
            <input
              className="input-preferredQty"
              placeholder="Preferred Qty"
              value={item.preferredQty}
              name="Preferred Qty"
              required
              onChange={this.handleChange}
            />
           <div className="preferred">
            <button type="submit" className="addQty-button">
              +
            </button>
            <button type="submit" className="subQty-button">
              -
            </button>
            </div>
            
              <input
              className="input-onHandQty"
              placeholder="On Hand Qty"
              value={item.onHandQty}
              name="On Hand Qty"
              required
              onChange={this.handleChange}
            />   
            <div className="onHand">
            <button type="submit" className="addQty-button">
              +
            </button>  
             <button type="submit" className="subQty-button">
              -
            </button>
            </div>
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
          
          </div>
        </div>
      </Layout>
    );
  }
}

export default ItemEdit;
