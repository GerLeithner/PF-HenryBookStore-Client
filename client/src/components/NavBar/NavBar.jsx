import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({paginado}) => {
  return <div>

    <Link to={"/home"} ><button>Home</button></Link>
    <Link to={"/catalogue"} ><button>Complete Catalogue</button></Link>
    <Link to={"/create"} ><button>Add a new Book</button></Link>
    <Link to={"/AboutUs"} ><button>About Us</button></Link>
    
          {/* <div>
            <SearchBar
            paginado={paginado}/>
           </div> */}
    
  </div>;
};

export default NavBar;
