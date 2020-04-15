import React from 'react';
import './Layout.css';                
import Nav from './Nav';
import Footer from './Footer';
import Background from "../../Images/background.png";

const Layout = (props) => (
  <div className="layout">
    
    <Nav user={props.user} />
    <div className="layout-children">{props.children}</div>
    <img className="cover" src={Background} />
    <Footer />
  </div>
);

export default Layout;
