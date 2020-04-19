import React from "react";
import "./Home.css";
import Layout from "./shared/Layout";

const Home = (props) => {
  return (
    <Layout user={props.user}>
      <div className="about">
        <p className="homeText">
          <span className="appName">Red Squirrel</span> takes the guesswork out of managing your inventory.
          <br />
          <span className="callToAction">Sign up now!</span> and track quantity changes and
        </p>
      </div>
    </Layout>
  );
};

export default Home;
