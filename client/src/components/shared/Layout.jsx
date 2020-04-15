import React from 'react';
import './Layout.css';              
import Nav from './Nav';
import Footer from './Footer';
import Background from "../../Images/background.png";

const Layout = (props) => (
  <div className="layout">
    <img className="cover" src={Background} />
    
    <Nav user={props.user} />
    
    <div className="layout-children">{props.children}</div>
    
    <Footer />
  </div>
);

export default Layout;
