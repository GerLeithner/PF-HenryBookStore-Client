import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookByTitle } from "../../redux/actions";

import { ButtonCatalogue } from "../styles/Catalogue";
import {
  InputSearch,
  SearchContainer,
  DropdownSearch,
  RowSearchBar,
} from "../styles/SearchBar";
import "./SearchBar.css";

const SearchBar = ({ paginado }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const allBooks = useSelector((state) => state.books);
  // const [author,setAuthor]=useState('')

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
    console.log(e);
  }

  return (
    <SearchContainer>
      <div className="button-search">
        <InputSearch
          placeholder="Search book by Title or Author..."
          type="text"
          value={title}
          onChange={(e) => handleInputChange(e)}
        />
        <ButtonCatalogue type="submit" onClick={(e) => handleSubmit(e)}>
          Search
        </ButtonCatalogue>
      </div>
      <DropdownSearch>
        {allBooks
          .filter((book) => {
            const searchTerm = title.toLowerCase();
            const titleOfBookSearched = book.title.toLowerCase();

            return (
              searchTerm &&
              titleOfBookSearched.startsWith(searchTerm) &&
              titleOfBookSearched !== searchTerm
            );
          })
          .map((book) => (
            <RowSearchBar onClick={(e) => handleSubmit(e)} key={book.title}>
              {book.title}
            </RowSearchBar>
          ))}
      </DropdownSearch>
    </SearchContainer>
  );
};

export default SearchBar;
