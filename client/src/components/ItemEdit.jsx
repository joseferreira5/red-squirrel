import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from './shared/Layout';

import { getItem, updateItem } from '../services/items';
import mascot from '../images/mascot_over_red.png';
import './ItemEdit.css';

class ItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        name: '',
        description: '',
        imgURL: '',
        preferredQty: 0,
        onHandQty: 0,
      },
      updated: false,
    };
  }

  async componentDidMount() {
    let { id } = this.props.match.params;
    const item = await getItem(id);
    this.setState({
      item: {
        name: item.name,
        description: item.description,
        imgURL: item.imgURL,
        preferredQty: parseInt(item.preferredQty),
        onHandQty: parseInt(item.onHandQty),
      },
    });
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

  addButtonQty = (event) => {
    event.preventDefault();
    const { name } = event.target;
    this.setState((prevState) => ({
      item: {
        ...this.state.item,
        [name]: prevState.item[name] + 1,
      },
    }));
  };

  subButtonQty = (event) => {
    event.preventDefault();
    const { name } = event.target;
    this.setState((prevState) => ({
      item: {
        ...this.state.item,
        [name]: prevState.item[name] - 1,
      },
    }));
  };

  render() {
    const { item, updated } = this.state;

    if (updated) {
      return <Redirect to={`/items/detail/${this.props.match.params.id}`} />;
    }

    return (
      <Layout user={this.props.user}>
        <div className="edit-item-container">
          <div className="edit-item-edit">
            <div className="image-container-edit">
              <img
                className="edit-item-image"
                src={item.imgURL || mascot}
                alt={item.name}
              />
              <form onSubmit={this.handleSubmit}>
                <input
                  className="edit-input-image-link"
                  placeholder="Image URL"
                  value={item.imgURL}
                  name="imgURL"
                  required
                  onChange={this.handleChange}
                />
              </form>
            </div>
            <form className="edit-form-edit" onSubmit={this.handleSubmit}>
              <input
                className="input-name-edit"
                placeholder="Name"
                value={item.name}
                name="name"
                required
                autoFocus
                onChange={this.handleChange}
              />
              <textarea
                className="textarea-description-edit"
                rows={1}
                cols={1}
                placeholder="Description"
                value={item.description}
                name="description"
                required
                onChange={this.handleChange}
              />
              <div className="preferred">
                <p className="edit-button-labels">Preferred Quantity</p>
                <button
                  className="button-labels-forEdit"
                  onClick={this.addButtonQty}
                  name="preferredQty"
                >
                  +
                </button>
                <span> {item.preferredQty} </span>
                <button
                  className="button-labels-forEdit"
                  onClick={this.subButtonQty}
                  name="preferredQty"
                >
                  -
                </button>
              </div>
              <div className="onHand">
                <p className="edit-button-labels">On Hand Quantity</p>
                <button
                  className="button-labels-forEdit"
                  onClick={this.addButtonQty}
                  name="onHandQty"
                >
                  +
                </button>
                <span>{item.onHandQty}</span>
                <button
                  className="button-labels-forEdit"
                  onClick={this.subButtonQty}
                  name="onHandQty"
                >
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
