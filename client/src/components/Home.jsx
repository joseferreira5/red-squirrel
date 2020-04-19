import React from "react";
import "./Home.css";
import Layout from "./shared/Layout";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <Layout user={props.user}>
      <div className="about">
        <p className="homeText">
          <span className="appName">Red Squirrel</span> takes the guesswork out
          of managing your inventory.
          <br />
          <Link className="callToAction" to={`/sign-up/`}>
            Sign up now!
          </Link>{" "}
          and begin tracking your stuff.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
