import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return <div>
    <Link to={"/catalogue"} ><button>See Complete Catalogue</button></Link>
    <Link to={"/AboutUs"} ><button>About Us</button></Link>
    
  </div>;
};

export default NavBar;
