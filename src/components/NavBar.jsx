import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
} from "../styles/NavBar";
import SearchBar from "./SearchBar.jsx";
import CardDetail from "./CardDetail.jsx";

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const bookDetail = useSelector((state) => state.detail);
  return (
    <div>
      <CardDetail book={bookDetail} modal={modal} setModal={setModal} />
      <ContainerNavBar>
        <HomeLinkNavBar to={"/home"}>Books Explorer</HomeLinkNavBar>
        <SubContainerNavBar>
          <SearchBar modal={modal} setModal={setModal} />
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/create"}>New Book</LinkNavBar>
          <LinkNavBar to={"/about"}>About Us</LinkNavBar>
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
};

export default NavBar;
