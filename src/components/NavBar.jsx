import React, { useState } from "react";
import {
  ContainerNavBar,
  SubContainerNavBar,
  LinkNavBar,
  HomeLinkNavBar,
} from "../styles/NavBar";
import SearchBar from "./SearchBar.jsx";
import CardDetail from "./CardDetail.jsx";
import { getUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated && currentUser) {
      dispatch(getUser(null));
    }
    if (isAuthenticated && !currentUser) {
      console.log(user);
      const { email, nickname } = user;

      const userDb = {
        email,
        nickname,
      };

      dispatch(getUser(userDb));
    }
  }, [dispatch, isAuthenticated]);

  const allBooks = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  var indexOfLastBook = currentPage * booksPerPage;

  var indexOfFirstBook = indexOfLastBook - booksPerPage;

  var currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);

  var countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  const [modal, setModal] = useState(false);
  const bookDetail = useSelector((state) => state.detail);
  return (
    <div>
      <CardDetail book={bookDetail} modal={modal} setModal={setModal} />
      <ContainerNavBar>
        <HomeLinkNavBar to={"/home"}>Books Explorer</HomeLinkNavBar>
        <SubContainerNavBar>
          <LinkNavBar to={"/catalogue"}>Catalogue</LinkNavBar>
          <LinkNavBar to={"/books"}>Books</LinkNavBar>
          <LinkNavBar to={"/about"}>About Us</LinkNavBar>
        </SubContainerNavBar>
      </ContainerNavBar>
    </div>
  );
};

export default NavBar;
