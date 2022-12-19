import React from "react";
import { ContainerNavBar, SubContainerNavBar, LinkNavBar, HomeLinkNavBar } from "../styles/NavBar";

const NavBar = () => {
  return (
    <ContainerNavBar>
        <HomeLinkNavBar to={"/home"}>Books Explorer</HomeLinkNavBar>
        <SubContainerNavBar>
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/create"}>New Book</LinkNavBar>
          <LinkNavBar to={"/about"}>About Us</LinkNavBar>
        </SubContainerNavBar>

    </ContainerNavBar>
  );
};

export default NavBar;
