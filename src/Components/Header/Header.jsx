import React from "react";
import "./Header.css";
const Header = ({ hideAnimation }) => {

return (

<header className="site-header">

<h1 className="site-title">

flixster

</h1>

{!hideAnimation && (

<section className="animated-bg">

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

</section>

)}

</header>

);

};



export default Header;