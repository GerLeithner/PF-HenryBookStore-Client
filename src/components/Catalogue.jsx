import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBookByGenre,
  getAuthors,
  getBooks,
  getGenres,
  sortByPublisherDate,
  sortByTitle,
} from "../redux/actions";
import Card from "./Card.jsx";
import CardDetail from "./CardDetail.jsx";
import NavBar from "./NavBar.jsx";
import Paginado from "./Paginado.jsx";
import SearchBar from "./SearchBar.jsx";
import { ContainerCards } from "../styles/Card";
import { ButtonCatalogue, SelectFilters } from "../styles/Catalogue";

const Catalogue = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const bookDetail = useSelector((state) => state.detail);

  const [modal, setModal] = useState(false);
  console.log("BOOKCAT", bookDetail);
  useEffect(() => {
    dispatch(getGenres());

    dispatch(getAuthors());

    dispatch(getBooks());
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
    console.log("Entré e:", e);
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
      <CardDetail book={bookDetail} modal={modal} setModal={setModal} />
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

        <SearchBar paginado={paginado} modal={modal} setModal={setModal} />
        <div>
          {/* booksPerPage,allBooks,paginado,currentPage */}
          <Paginado
            booksPerPage={booksPerPage}
            allBooks={allBooks.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>

        <CardDetail />
        {/* {bookDetail.length&&(<CardDetail/>)
     } */}
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
      </div>
    </div>
  );
};

export default Catalogue;
