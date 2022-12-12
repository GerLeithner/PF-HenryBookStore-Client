import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getGenres,
  getAuthors,
  filterBookByGenre,
  sortByTitle,
  sortByPublisherDate,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import { SelectFilters, ButtonCatalogue } from "../styles/Catalogue";

const Catalogue = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const allAuthors = useSelector((state) => state.authors);
  const allGenres = useSelector((state) => state.genres);
  useEffect(() => {
    if (!allGenres.length) {
      dispatch(getGenres());
    }
    if (!allAuthors.length) {
      dispatch(getAuthors());
    }
    if (!allBooks.length) {
      dispatch(getBooks());
    }
  }, [dispatch]);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  var indexOfLastBook = currentPage * booksPerPage;

  var indexOfFirstBook = indexOfLastBook - booksPerPage;

  var currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);

  var countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBooks());
  }
  function handleFilterGenre(e) {
    dispatch(filterBookByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleSortByTitle(e) {
    e.preventDefault();
    dispatch(sortByTitle(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }

  function handleSortByPublisherDate(e) {
    e.preventDefault();
    dispatch(sortByPublisherDate(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }

  return (
    <div>
      <NavBar />
      {/* <div>
        <Link to={"/home"}>
          <button>Back to Home</button>
        </Link>
      </div> */}
      <div>
        <ButtonCatalogue
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload Books
        </ButtonCatalogue>
      </div>
      <div>
        <SelectFilters>
          <select onChange={(e) => handleSortByTitle(e)}>
            <option value="" hidden>
              ABC
            </option>
            <option value="asc">Increasing</option>
            <option value="desc">Decreasing</option>
          </select>

          <select onChange={(e) => handleSortByPublisherDate(e)}>
            <option value="" hidden>
              Publisher Date
            </option>
            <option value="asc">Increasing</option>
            <option value="desc">Decreasing</option>
          </select>

          <select onChange={(e) => handleFilterGenre(e)}>
            <option value="" hidden>
              Genre
            </option>
            <option value="all">All</option>
            {allGenres?.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </SelectFilters>

        <SearchBar paginado={paginado} />
        <div>
          {/* booksPerPage,allBooks,paginado,currentPage */}
          <Paginado
            booksPerPage={booksPerPage}
            allBooks={allBooks.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
