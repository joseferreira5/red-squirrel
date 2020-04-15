import React, { Component } from 'react';
import './ItemEdit.css';
import { Redirect } from 'react-router-dom';
import Layout from './shared/Layout';
import { getItem, updateItem } from '../services/items';

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: '',
        description: '',
        imgURL: '',
        price: '',
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
      return <Redirect to={`/items/${this.props.match.params.id}`} />;
    }

    return (
      <Layout user={this.props.user}>
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
              value={item.name}
              name="name"
              required
              autoFocus
              onChange={this.handleChange}
            />
            <input
              className="input-preferredQty"
              placeholder="preferredQty"
              value={item.preferredQty}
              name="Preferred Qty"
              required
              onChange={this.handleChange}
            />
              <input
              className="input-onHandQty"
              placeholder="onHandQty"
              value={item.onHandQty}
              name="On Hand Qty"
              required
              onChange={this.handleChange}
            />

            <textarea
              className="textarea-description"
              rows={10}
              cols={78}
              placeholder="Description"
              value={item.description}
              name="description"
              required
              onChange={this.handleChange}
            />
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

export default ItemEdit;
