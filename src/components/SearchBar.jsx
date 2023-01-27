import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookById, getBookByTitle } from "../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";
import { getAuthors, getBooks, getGenres } from "../redux/actions";

import {
  DropdownSearch,
  InputSearch,
  RowSearchBar,
  SearchContainer,
  InputAndButton,
} from "../styles/SearchBar";

const SearchBar = ({ paginado, modal, setModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const allBooks = useSelector((state) => state.allBooks);
  const books = useSelector((state) => state.books);
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
    setTitle(e.target.value);
    // setAuthor(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // hacer un IF y buscar la forma de diferenciar si la busqueda es un author o un title y luego despachar
    // dispatch(getBookByAuthor)  //action que traiga libro por title o accion que traiga libro por autor
    dispatch(getBookByTitle(title));
    setTitle("");
    // setAuthor('');
    paginado(1);
  }
  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    let id = allBooks.find((book) => book.title === e.target.textContent).id;
    dispatch(getBookById(id));
    setTitle("");
  }
  return (
    <SearchContainer>
      <InputAndButton>
        <InputSearch
          placeholder="By Title or Author"
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            height: "32px",
            borderRadius: "0px 10px 10px 0px",
          }}
        >
          Go
        </button>
      </InputAndButton>
      <div>
        <DropdownSearch>
          {allBooks
            .filter((book) => {
              const searchTerm = title.toLowerCase();
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
