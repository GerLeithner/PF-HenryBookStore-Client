import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getAuthors,
  getGenres,
  sortBooksByPublishedDate,
  sortBooksByTitle,
  filterBooksByStatus,
  filterBooksByGenre,
  filterBooksByLength,
  filterBy,
  deleteFilter,
  cleanSortedBooks,
  searchInput,
  getCurrentUser,
  editState,
  turnOnModal,
  getBookById,
} from "../redux/actions";

import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";
import SortOrFilter from "./SortOrFilter.jsx";
import SubscribeNav from "./SubscribeNav.jsx";
import TablePaged from "./TablePaged.jsx";
import { Filters } from "./Filters";

import { SideButton } from "../styles/SortOrFilter";
import { BooksContainer } from "../styles/BooksTable";
import { ContainerCards } from "../styles/Card";
import {
  FoundContainer,
  FoundTitles,
  SelectFilters,
  SideBarContainer,
  Titles,
} from "../styles/Catalogue";
import { H3Form } from "../styles/CreateBook";
import CardDetail from "./CardDetail";
import { useAuth0 } from "@auth0/auth0-react";

const Catalogue = () => {
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const currentUser = useSelector((state) => state.currentUser);
  //const filters = useSelector((state) => state.filters);
  const book = useSelector((state) => state.bookDetail);
  const modal = useSelector((state) => state.modal);
  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);

  const [header, setHeader] = useState("ALL BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const [, setSort] = useState({ name: "", option: "" });
  const [filters, setFilters] = useState([]);
  const [subscribe, setSubscribe] = useState(true);
  const { user, logout } = useAuth0();

  let indexOfLastBook = currentPage * booksPerPage;
  let indexOfFirstBook = indexOfLastBook - booksPerPage;
  let currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);
  let countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
    return () => {
      //dispatch(getBooks());

      if (window.location.pathname !== "/search") {
        dispatch(searchInput(""));
      }
    };
  }, [dispatch, read, readeds, favorites]);

  function handleSort(e) {
    e.preventDefault();

    if (e.target.name === "Sort By Title") {
      dispatch(sortBooksByTitle(e.target.innerText));
    }
    if (e.target.name === "Sort By Year") {
      dispatch(sortBooksByPublishedDate(e.target.innerText));
    }
    setSort({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }
  const readChange = () => {
    setRead((prevRead) => !prevRead);
  };
  const readedsChange = (condition) => {
    setReadeds(condition);
  };

  const favoritesChange = (condition) => {
    setFavorites(condition);
  };

  function handleTitleClick(e, id) {
    e.preventDefault(e);
    dispatch(editState(false));
    dispatch(turnOnModal());
    window.scrollTo(0, 0);
    dispatch(getBookById(id));
  }

  return (
    <div>
      <CardDetail
        catalogue={true}
        book={book}
        readChange={readChange}
        read={read}
        readedsChange={readedsChange}
        readeds={readeds}
        favorites={favorites}
        favoritesChange={favoritesChange}
      />
      <div
        style={{
          zIndex: "1",
          position: "relative",
          paddingTop: modal ? "420px" : "0px",
        }}
      >
        <Filters handleSort={handleSort} />
        <SubscribeNav setSubscribe={setSubscribe} />
        <FoundContainer>
          <span style={{ color: "grey", flexDirection: "start" }}>
            You may be interested in:{" "}
          </span>
          <FoundTitles>
            {allBooks?.slice(0, 4).map((b, i) => {
              return (
                <span key={b.id}>
                  <Titles onClick={(e) => handleTitleClick(e, b.id)}>
                    {b.title}
                  </Titles>

                  {i + 1 !== allBooks?.slice(0, 4).length ? (
                    <span style={{ cursor: "default" }} key={b.id + "breaker"}>
                      {" "}
                      |{" "}
                    </span>
                  ) : (
                    <span key={b.id + "spacer"}></span>
                  )}
                </span>
              );
            })}
          </FoundTitles>
          <div></div>
        </FoundContainer>

        <BooksContainer
          paddingTop={
            subscribe && currentUser && !currentUser.subscription
              ? "20px"
              : "70px"
          }
        >
          <TablePaged
            booksPerPage={booksPerPage}
            allBooks={allBooks.length}
            paginado={paginado}
            currentPage={currentPage}
          />

          <ContainerCards>
            {currentBook?.map((b) => {
              return (
                <div key={b.id}>
                  <Card
                    id={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                  />
                </div>
              );
            })}
          </ContainerCards>
        </BooksContainer>
      </div>
    </div>
  );
};

export default Catalogue;
