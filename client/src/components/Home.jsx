import React from "react";
import "./Home.css";
import Layout from "./shared/Layout";

const Home = (props) => {
  return (
    <Layout user={props.user}>
      <div className="about">
        <p className="homeText">
          <span className="appName">Red Squirrel</span> is a visual inventory
          management and tracking software that allows you to input your stock
          items and their details as well as track quantity changes. Our app
          provides a simple interface for taking the guesswork out of managing
          your inventory.
          <br />
          <span className="callToAction">Sign up now!</span> and maintain a
          balance between too much and too little stock. Our color coding system
          alerts you when levels are low and items need to be replenished.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
