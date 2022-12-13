import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBookByTitle } from "../../redux/actions";

import { ButtonCatalogue } from "../styles/Catalogue";
import { InputSearch, SearchContainer } from "../styles/SearchBar";

const SearchBar = ({ paginado }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
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
  }

  return (
    <SearchContainer>
      <InputSearch
        placeholder="Search book by Title or Author"
        type="text"
        onChange={(e) => handleInputChange(e)}
      />
      <ButtonCatalogue type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </ButtonCatalogue>
    </SearchContainer>
  );
};

export default SearchBar;
