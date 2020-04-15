import React, { Component } from "react";
import "./Items.css";
import Item from "./Item";
import Search from "./Search";
import { AZ, ZA, lowestFirst, highestFirst } from "./Sort";
import Layout from "./shared/Layout";
import { getItems } from "../services/items";

class Items extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filterValue: "",
      filteredItems: null,
      selectValue: "Featured"
    };
  }
  
//user props don't include items for some reason 
  //state in App.js - user doesn't inclue items either 
  
  async componentDidMount() {
    const items = await getItems(this.props.user._id);
    this.setState({ items });
  }

  handleSearchChange = event => {
    const filter = () => {
      const filteredItems = this.state.items.filter(item => {
        return item.name
          .toLowerCase()
          .includes(this.state.filterValue.toLowerCase());
      });
      this.setState({ filteredItems });
    };
    this.setState({ filterValue: event.target.value }, filter);
  };

  handleSortChange = event => {
    this.setState({ selectValue: event.target.value });
    let input = event.target.value; // a-z
    const { items } = this.state;
    switch (input) {
      case "name-ascending":
        this.setState({
          items: AZ(items)
        });
        break;
      case "name-descending":
        this.setState({
          items: ZA(items)
        });
        break;
      case "price-ascending":
        this.setState({
          items: lowestFirst(items)
        });
        break;
      case "price-descending":
        this.setState({
          items: highestFirst(items)
        });
        break;
      default:
        break;
    }
  };

  handleSubmit = event => event.preventDefault();

  render() {
    const items = this.state.filteredItems
      ? this.state.filteredItems
      : this.state.items;
    const ITEMS = items.map((item, index) => (
      <Item
        userId={this.props.user._id}
        itemId={item._id}
        name={item.name}
        imgURL={item.imgURL}
        onHandQty={item.onHandQty}
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
        { this.state.items && <div className="items">{ITEMS}</div>}
      </Layout>
    );
  }
}

export default Items;
