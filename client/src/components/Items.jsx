import React, { Component } from 'react';
import './Items.css';
import Item from './Item';
import Search from './Search';
import { AZ, ZA, lowestFirst, highestFirst } from './Sort';
import Layout from './shared/Layout';
import { getItems } from '../services/items';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filterValue: '',
      filteredItems: null,
      selectValue: 'Featured',
    };
  }

  async componentDidMount() {
    const items = await getItems();
    this.setState({ items });
  }

  handleSearchChange = (event) => {
    const filter = () => {
      const filteredItems = this.state.items.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(this.state.filterValue.toLowerCase());
      });
      this.setState({ filteredItems });
    };
    this.setState({ filterValue: event.target.value }, filter);
  };

  handleSortChange = (event) => {
    this.setState({ selectValue: event.target.value });
    let input = event.target.value; // a-z
    const { products } = this.state;
    switch (input) {
      case 'name-ascending':
        this.setState({
          products: AZ(products),
        });
        break;
      case 'name-descending':
        this.setState({
          products: ZA(products),
        });
        break;
      case 'price-ascending':
        this.setState({
          products: lowestFirst(products),
        });
        break;
      case 'price-descending':
        this.setState({
          products: highestFirst(products),
        });
        break;
      default:
        break;
    }
  };

  handleSubmit = (event) => event.preventDefault();

  render() {
    const products = this.state.filteredProducts
      ? this.state.filteredProducts
      : this.state.products;
    const PRODUCTS = products.map((product, index) => (
      <Item
        _id={product._id}
        name={product.name}
        imgURL={product.imgURL}
        price={product.price}
        key={index}
      />
    ));

    return (
      <Layout user={this.props.user}>
        <Search
          onSubmit={this.handleSubmit}
          value={this.state.filterValue}
          onChange={this.handleSearchChange}
        />
        <form className="sort-container" onSubmit={this.handleSubmit}>
          <label htmlFor="sort">SORT BY:</label>
          <select
            className="sort"
            value={this.state.selectValue}
            onChange={this.handleSortChange}
          >
            <option className="option" value="name-ascending">
              &nbsp; Alphabetically, A-Z &nbsp;
            </option>
            <option value="name-descending">
              &nbsp; Alphabetically, Z-A &nbsp;
            </option>
            <option value="price-ascending">
              &nbsp; Price, low to high &nbsp;
            </option>
            <option value="price-descending">
              &nbsp; Price, high to low &nbsp;
            </option>
          </select>
        </form>
        <div className="products">{PRODUCTS}</div>
      </Layout>
    );
  }
}

export default Items;
