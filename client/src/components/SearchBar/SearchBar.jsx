import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// hay que importar las acciones de getbookbyname y getbookbyauthor


const SearchBar = ({paginado}) => {
  const dispatch=useDispatch()
  const [name,setName]=useState('')
  const [author,setAuthor]=useState('')

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    setAuthor(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch()  //action que traiga libro por nombre o accion que traiga libro por autor
    setName('');
    setAuthor('');
    paginado(1);
  }

  return (
  <div>
    <input 
    placeholder="Search book by Name or Author"
    type='text'
    onChange={(e)=>handleInputChange(e)}/>
    <button type='submit'
    onClick={(e)=>handleSubmit(e)}>Search</button>

  </div>)
};

export default SearchBar;
