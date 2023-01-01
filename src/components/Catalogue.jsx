import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBooksByGenre,
  getAuthors,
  getBooks,
  getGenres,
  sortBooksByPublishedDate,
  sortBooksByTitle,
} from "../redux/actions";
import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";
import { BooksContainer } from "../styles/BooksTable"
import { ContainerCards } from "../styles/Card";
import {
  ButtonCatalogue,
  SelectFilters,
  SideBarContainer,
  CatalogueSelects,
} from "../styles/Catalogue";

const Catalogue = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getGenres());

    dispatch(getAuthors());

    dispatch(getBooks());
  }, [dispatch]);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  let indexOfLastBook = currentPage * booksPerPage;
  let indexOfFirstBook = indexOfLastBook - booksPerPage;
  let currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);
  let countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBooks());
  }

  function handleFilterGenre(e) {
    dispatch(filterBooksByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handlesortBooksByTitle(e) {
    e.preventDefault();
    dispatch(sortBooksByTitle(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }

  function handlesortBooksByPublishedDate(e) {
    e.preventDefault();
    dispatch(sortBooksByPublishedDate(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
    console.log(orden);
  }

  return (
    <div>
      <SideBarContainer>
        <ButtonCatalogue onClick={(e) => handleClick(e)}>
          Reload Books
        </ButtonCatalogue>
        <SearchBar paginado={paginado} modal={modal} setModal={setModal} />
        <SelectFilters>
          <CatalogueSelects onChange={(e) => handlesortBooksByTitle(e)}>
            <option value="" hidden>
              ABC
            </option>
            <option value="asc">Increasing</option>
            <option value="desc">Decreasing</option>
          </CatalogueSelects>

          <CatalogueSelects onChange={(e) => handlesortBooksByPublishedDate(e)}>
            <option value="" hidden>
              Publisher Date
            </option>
            <option value="asc">Increasing</option>
            <option value="desc">Decreasing</option>
          </CatalogueSelects>

          <CatalogueSelects onChange={(e) => handleFilterGenre(e)}>
            <option value="" hidden>
              Genre
            </option>
            <option value="all">All</option>
            {allGenres?.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </CatalogueSelects>
        </SelectFilters>
      </SideBarContainer>
      <BooksContainer>
        <div>
          <Paged
            booksPerPage={booksPerPage}
            allBooks={allBooks.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
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
