import React from "react";
import "./Home.css";
import Layout from "./shared/Layout";

const Home = (props) => {
  return (
    <Layout user={props.user}>
      <div className="about">
        <p className="homeText">
        <span className="appName">Red Squirrel</span> is a visual inventory management and tracking software
          that allows users to input items and their details as well as track changes to the quantities of the items. We provide a simple interfacefor taking the guesswork out of managing your inventory.
          <span className="callToAction">Sign up now!</span> and maintain a
          balance between too much and too little inventory. Color codes
          highlight levels in your inventory that need replenishment.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
