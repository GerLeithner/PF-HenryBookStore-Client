import React from "react";
import { ContainerNavBar, LinkNavBar, Wrapper } from "../styles/NavBar";

const NavBar = () => {
  return (
    <ContainerNavBar>
      <Wrapper>
        <LinkNavBar to={"/home"}>Home</LinkNavBar>
        <LinkNavBar to={"/catalogue"}>Complete Catalogue</LinkNavBar>
        <LinkNavBar to={"/create"}>Add a new Book</LinkNavBar>
        <LinkNavBar to={"/AboutUs"}>About Us</LinkNavBar>

        {/* <div>
            <SearchBar
            paginado={paginado}/>
           </div> */}
      </Wrapper>
    </ContainerNavBar>
  );
};

export default NavBar;
