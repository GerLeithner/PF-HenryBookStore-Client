import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookById, getBookByTitle } from "../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";
import { getAuthors, getBooks, getGenres, searchInput } from "../redux/actions";
import searchLogo from "../icons/search.svg";

import {
  DropdownSearch,
  InputSearch,
  RowSearchBar,
  SearchContainer,
  InputAndButton,
  ButtonContainer,
} from "../styles/SearchBar";

const SearchBar = ({ modal, setModal }) => {
  const dispatch = useDispatch();

  const [inputFocus, setInputFocus] = useState(false);
  const search = useSelector((state) => state.search);
  //const [title, setTitle] = useState("");
  const allBooks = useSelector((state) => state.allBooks);
  const books = useSelector((state) => state.books);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  // const [author,setAuthor]=useState('')
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
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);

  function handleInputChange(e) {
    e.preventDefault();

    dispatch(searchInput(e.target.value));
    dispatch(getBookByTitle(search));
    console.log("Title: ", search);
    // setAuthor(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    inputRef.current.focus();
    /*     if (inputFocus) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    } */

    // hacer un IF y buscar la forma de diferenciar si la busqueda es un author o un title y luego despachar
    // dispatch(getBookByAuthor)  //action que traiga libro por title o accion que traiga libro por autor
    /*     dispatch(getBookByTitle(search)); */
    dispatch(searchInput(""));
    // setAuthor('');
  }
  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    let id = allBooks.find((book) => book.title === e.target.textContent).id;
    dispatch(getBookById(id));
  }
  return (
    <SearchContainer>
      <InputAndButton>
        <InputSearch
          ref={inputRef}
          placeholder="Search by title or author..."
          type="search"
          value={search}
          onChange={(e) => handleInputChange(e)}
          results={1}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        <ButtonContainer
          type="submit"
          onClick={(e) => handleSubmit(e)}
        ></ButtonContainer>
      </InputAndButton>

      <div>
        <DropdownSearch>
          {allBooks
            .filter((book) => {
              const searchTerm = search.toLowerCase();
              const titleOfBookSearched = book.title.toLowerCase();

              const nameOfAuthorSearched = book.author.name.toLowerCase();

              return (
                searchTerm &&
                (titleOfBookSearched.includes(searchTerm) ||
                  nameOfAuthorSearched.includes(searchTerm)) &&
                titleOfBookSearched !== searchTerm
              );
            })
            .slice(0, 10)
            .map((book, i) => (
              <RowSearchBar
                onClick={(e) => handleClick(e)}
                modal={modal}
                setModal={setModal}
                key={i}
              >
                {book.title}
              </RowSearchBar>
            ))}
        </DropdownSearch>
      </div>
    </SearchContainer>
  );
};

export default SearchBar;
