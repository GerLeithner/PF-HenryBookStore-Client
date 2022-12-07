import React from "react";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
//import actions from "../../redux/actions"
import { Link } from "react-router-dom";
import Card from "../Card";
import Paginado from "./Paginado";


const AllCards = () => {
    const dispatch=useDispatch()
    const allBooks=useSelector((state)=>state.books)
    useEffect(()=>{
        dispatch(getBooks());
    },[dispatch])

    const allGenres=useSelector((state)=>state.genres)
    useEffect(()=>{
        dispatch(getGenres());
    },[dispatch])

    const[orden,setOrden]=useState('')
    const[currentPage,setCurrentPage]=useState(1)
    const [booksPerPage, setBooksPerPage]=useState(20)
    var indexOfLastBook=currentPage * booksPerPage
    var indexOfFirstBook=indexOfLastBook - booksPerPage
    var currentBook= allBooks.slice(indexOfFirstBook,indexOfLastBook)
    var countPages2=Math.ceil(allBooks.length/booksPerPage)
    
    
    const paginado=(pageNumber)=>{
        if(pageNumber>0 && pageNumber<=countPages2)
        setCurrentPage(pageNumber)
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());

    }
    function handleFilterGenre(e){
        dispatch(filterPokeByGenre(e.target.value));
        setCurrentPage(1);

    }

    function handleSortByName (e){
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(orden)
    }

    function handleSortByPrice (e){
        e.preventDefault();
        dispatch(sortByPrice(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(orden)
    }

  return (
  <div>
    <div>
    <button onClick={e=>{handleClick(e)}}>Reload Books</button>
    </div>
    <div >
           <select onChange={e=> handleSortByName(e)}>
           <option value="" hidden>ABC</option>
            <option value='asc'>Increasing</option>
            <option value='desc'>Decreasing</option>
           </select>

           <select onChange={e=> handleSortByPrice(e)}>
           <option value="" hidden>Price</option>
           <option value='asc'>Increasing</option>
            <option value='desc'>Decreasing</option>
           </select>


           <select onChange={e=> handleFilterGenre(e)}>
           <option value="" hidden>Genre</option>
            <option value='all' >All</option>
            {
                allGenres?.map(el=>(
                    <option key={el.id} value={el.name}>{el.name}</option>
                ))

            }
           </select>

           <SearchBar
           paginado={paginado}/>
           <div>
           <Paginado
           pokePerPage={pokePerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
            currentPage={currentPage}/>
           </div>

           <div>
            {
            currentBook?.map(el=>{
                return(
                    <div key={el.id}>
                        <Card title={el.title} genre={el.genre} img={el.img} key={el.id} id={el.id} rating={el.rating} reviews={el.reviews} authors={el.authors} summary={el.summary} price={el.price}/>

                    </div>
                );
            })}
           </div>
    </div>
    
    
  </div>);
};

export default AllCards;
