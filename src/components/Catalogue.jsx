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
} from "../redux/actions";

import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";
import SortOrFilter from "./SortOrFilter.jsx";
import SubscribeNav from "./SubscribeNav.jsx";
import TablePaged from "./TablePaged.jsx";

import { SideButton } from "../styles/SortOrFilter";
import { BooksContainer } from "../styles/BooksTable";
import { ContainerCards } from "../styles/Card";
import { SelectFilters, SideBarContainer } from "../styles/Catalogue";
import { H3Form } from "../styles/CreateBook";

const Catalogue = () => {
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const currentUser = useSelector((state) => state.currentUser);
  //const filters = useSelector((state) => state.filters);

  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const [header, setHeader] = useState("ALL BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const [, setSort] = useState({ name: "", option: "" });
  const [, setFilter] = useState({ name: "", option: "" });
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
    dispatch(getGenres());

    dispatch(getAuthors());

    dispatch(getBooks());
  }, [dispatch]);

  // carga los favs
  useEffect(() => {
    if (currentUser) {
      const userFavorites = currentUser.Favorites;

      let allFavorites = [];

      for (let i = 0; i < currentUser.Favorites.length; i++) {
        let fav = currentUser.Favorites[i].id;
        allFavorites.push(fav);
      }
      setArrayFavorite(allFavorites);
    }
  }, [dispatch, currentUser]);

  // carga los readed
  useEffect(() => {
    if (currentUser) {
      const userReaded = currentUser.Read;

      let allReaded = [];

      for (let i = 0; i < currentUser.Read.length; i++) {
        let read = currentUser.Read[i].id;
        allReaded.push(read);
      }
      setArrayReaded(allReaded);
    }
  }, [dispatch, currentUser]);

  // carga los reading
  useEffect(() => {
    if (currentUser) {
      const userReading = currentUser.Reading;
      let allReading = [];

      for (let i = 0; i < currentUser.Reading.length; i++) {
        let reading = currentUser.Reading[i].id;
        allReading.push(reading);
      }
      setArrayReading(allReading);
    }
  }, [dispatch, currentUser]);

  function handleReload(e) {
    e.preventDefault();

    dispatch(getBooks());
    setFilters([]);
  }

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

  async function handleFilter(e) {
    e.preventDefault();

    let includesGenre = false;
    let includesLength = false;

    if (!filters.length) {
      if (e.target.name === "Filter By Genre") {
        dispatch(filterBy(["Genre-" + e.target.innerText]));
        setFilters([...filters, "Genre-" + e.target.innerText]);
      }
      if (e.target.name === "Filter By Length") {
        console.log(e.target.innerText);
        dispatch(filterBy(["Length-" + e.target.innerText]));
        setFilters([...filters, "Length-" + e.target.innerText]);
      }
    } else {
      if (e.target.name === "Filter By Genre") {
        filters.forEach((filter) => {
          if (filter.includes("Genre-")) includesGenre = true;
        });
        if (!includesGenre) {
          dispatch(filterBy([...filters, "Genre-" + e.target.innerText]));
          setFilters([...filters, "Genre-" + e.target.innerText]);
        }
      }

      if (e.target.name === "Filter By Length") {
        filters.forEach((filter) => {
          if (filter.includes("Length-")) includesLength = true;
        });
        if (!includesLength) {
          dispatch(filterBy([...filters, "Length-" + e.target.innerText]));
          setFilters([...filters, "Length-" + e.target.innerText]);
        }
      }
    }

    dispatch(filterBy(filters));

    setCurrentPage(1);
  }

  function handleDeleteFilter(e) {
    e.preventDefault();

    let deletedFilter = e.target.textContent.substring(
      0,
      e.target.textContent.indexOf("X") - 1
    );

    let currentFilters = filters.filter((f) => f !== deletedFilter);

    dispatch(cleanSortedBooks());

    dispatch(filterBy(currentFilters));

    setFilters(filters.filter((f) => f !== deletedFilter));
  }

  return (
    <div>
      <SideBarContainer
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
      </SideBarContainer>
      <SubscribeNav setSubscribe={setSubscribe} />
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
                  arrayFavorite={arrayFavorite}
                  arrayReaded={arrayReaded}
                  arrayReading={arrayReading}
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
