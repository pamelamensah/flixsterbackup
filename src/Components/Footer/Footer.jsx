import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Flixster. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
