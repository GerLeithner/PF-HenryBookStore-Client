import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return <div>
    <Link to={"/home"} ><button>Home</button></Link>
    <Link to={"/catalogue"} ><button>Complete Catalogue</button></Link>
    <Link to={"/AboutUs"} ><button>About Us</button></Link>
    <Link to={"/create"} ><button>Add a new Book</button></Link>
    //
    
  </div>;
};

export default NavBar;
