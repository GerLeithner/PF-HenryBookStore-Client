import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getAuthors,
  getGenres,
  sortBooksByPublishedDate,
  sortBooksByTitle,
  filterBooksByStatus,
  filterBooksByGenre
} from "../redux/actions";

import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";
import SortOrFilter from "./SortOrFilter.jsx";

import { SideButton } from "../styles/SortOrFilter";
import { BooksContainer } from "../styles/BooksTable"
import { ContainerCards } from "../styles/Card";
import { SelectFilters, SideBarContainer } from "../styles/Catalogue";
import { H3Form } from "../styles/CreateBook";


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

  const [, setSort] = useState({ name: "", option: ""});
  const [, setFilter] = useState({ name: "", option: ""});
  const [header, setHeader] = useState("ALL BOOKS");

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

  function handleSort(e) {
    e.preventDefault();

    if(e.target.name === "Sort By Title") {
      dispatch(sortBooksByTitle(e.target.innerText));
    }
    if(e.target.name === "Sort By Year") {
      dispatch(sortBooksByPublishedDate(e.target.innerText));
    }
    setSort({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();

    if(e.target.name === "Filter By Genre") {
      dispatch(filterBooksByGenre(e.target.innerText));
    }
    if(e.target.name === "Filter By Status") {
      dispatch(filterBooksByStatus(e.target.innerText));
    }
    setFilter({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <SideBarContainer>
        <SideButton onClick={(e) => handleClick(e)} ancho={"170px"}>
          RELOAD BOOKS
        </SideButton>
        <SearchBar paginado={paginado} modal={modal} setModal={setModal} />
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
          {/* <Sort By Popularity 
            name="Filter By Size" 
            options={["More Populars", "Less Populars"]} 
          /> */}
          {/* <SortOrFilter 
            name="Filter By Size" 
            options={["Large", "Medium", "Short"]} 
          /> */}
          <SortOrFilter 
            name="Filter By Genre" 
            options={allGenres.map(g => g.name)}
            onButton={handleFilter} 
          />
          <SortOrFilter 
            name="Filter By Status" 
            options={["active", "disabled"]}
            onButton={handleFilter} 
          />
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
        <div/>
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
