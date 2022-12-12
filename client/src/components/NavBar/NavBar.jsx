import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import LinkNavBar from "../styles/NavBar";
import { ContainerNavBar } from "../styles/NavBar";

const NavBar = ({ paginado }) => {
  return (
    <ContainerNavBar>
      <LinkNavBar to={"/home"}>Home</LinkNavBar>
      <LinkNavBar to={"/catalogue"}>Complete Catalogue</LinkNavBar>
      <LinkNavBar to={"/create"}>Add a new Book</LinkNavBar>
      <LinkNavBar to={"/AboutUs"}>About Us</LinkNavBar>

      {/* <div>
            <SearchBar
            paginado={paginado}/>
           </div> */}
    </ContainerNavBar>
  );
};

export default NavBar;
