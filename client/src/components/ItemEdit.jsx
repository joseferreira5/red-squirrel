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
        preferredQty: 0,
        onHandQty: 0,
        show: true
      },
      updated: false,
    };
  }
  async componentDidMount() {
    let { id } = this.props.match.params;
    const item = await getItem(id);
    this.setState({ ...item, preferredQty: parseInt(item.preferredQty), onHandQty: parseInt(item.onHandQty) });
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
    const { name } = event.target;
    this.setState(prevState => ({
      [name]: parseInt(prevState[name]) + 1
    }));
  };
  subButtonQty = (event) => {
    const { name} = event.target;
    this.setState(prevState => ({
      [name]: prevState[name] - 1
    }));
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { item, updated } = this.state;
    if (updated) {
      return <Redirect to={`/items/detail/${this.props.match.params.id}`} />;
    }
    let { count } = this.state
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
                placeholder="Image URL"
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
           <div className="preferred">
           <div>
             <p>Preferred Quantity</p>
             <span><button onClick={this.addButtonQty} name='preferredQty'>+</button></span>
              <span>  {this.state.preferredQty}  </span>
              <span><button onClick={this.subButtonQty} name='preferredQty'>-</button></span>
           </div>
            </div> 
            <div className="onHand">
            <div>
              <p>On Hand Quantity</p>
           <span><button onClick={this.addButtonQty} name='onHandQty'>+</button></span>
            <span>  {this.state.onHandQty}  </span>
            <span><button onClick={this.subButtonQty} name='onHandQty'>-</button></span>
        </div>
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
