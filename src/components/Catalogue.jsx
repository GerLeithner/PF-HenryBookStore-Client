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

const Catalogue = () => {
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const currentUser = useSelector((state) => state.currentUser);
  //const filters = useSelector((state) => state.filters);
  const book = useSelector((state) => state.bookDetail);
  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);

  const [header, setHeader] = useState("ALL BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const [, setSort] = useState({ name: "", option: "" });
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [subscribe, setSubscribe] = useState(true);

  let indexOfLastBook = currentPage * booksPerPage;
  let indexOfFirstBook = indexOfLastBook - booksPerPage;
  let currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);
  let countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  useEffect(() => {
    return () => {
      dispatch(searchInput(""));
    };
  }, []);

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

  return (
    <div>
      {/*       <SideBarContainer
        paddingTop={
          subscribe && currentUser && !currentUser.subscription
            ? "115px"
            : "65px"
        }
      >
        <SideButton onClick={(e) => handleReload(e)} ancho={"170px"}>
          RELOAD BOOKS
        </SideButton>
        <SelectFilters>
          <SortOrFilter
            name="Sort By Title"
            options={["Ascending", "Descending"]}
            onButton={handleSort}
          />
          <SortOrFilter
            name="Sort By Year"
            options={["Oldest", "Newest"]}
            onButton={handleSort}
          />

          {
            <SortOrFilter
              name="Filter By Length"
              options={["Large", "Medium", "Short"]}
              onButton={(e) => handleFilter(e)}
            />
          }
          <SortOrFilter
            name="Filter By Genre"
            options={allGenres.map((g) => g.name)}
            onButton={(e) => handleFilter(e)}
          />
        </SelectFilters>

        <div>
          {filters.length ? (
            filters.map((f) => (
              <div
                onClick={(e) => handleDeleteFilter(e)}
                key={f}
                id={f}
                title={f}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
              >
                <p>{f} X </p>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </SideBarContainer> */}
      <CardDetail
        book={book}
        readChange={readChange}
        read={read}
        readedsChange={readedsChange}
        readeds={readeds}
        favorites={favorites}
        favoritesChange={favoritesChange}
      />
      <Filters handleSort={handleSort} />
      <SubscribeNav setSubscribe={setSubscribe} />
      <FoundContainer>
        <span style={{ color: "grey", flexDirection: "start" }}>
          You may be interested in:{" "}
        </span>
        <FoundTitles>
          {allBooks?.slice(0, 4).map((b, i) => {
            return (
              <span>
                <Titles>{b.title}</Titles>

                {i + 1 !== allBooks?.slice(0, 4).length ? (
                  <span style={{ cursor: "default" }}> | </span>
                ) : (
                  <span></span>
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
                  modal={modal}
                  setModal={setModal}
                />
              </div>
            );
          })}
        </ContainerCards>
      </BooksContainer>
    </div>
  );
};

export default Catalogue;
