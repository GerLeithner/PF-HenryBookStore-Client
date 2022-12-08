import React from "react";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
//import {} from "../../redux/actions"
import { getBooks, getGenres, getAuthors, filterBookByGenre,sortByTitle,sortByRelease } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";


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

    const allAuthors=useSelector((state)=>state.authors)
    useEffect(()=>{
        dispatch(getAuthors());
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
        dispatch(getBooks());

    }
    function handleFilterGenre(e){
        dispatch(filterBookByGenre(e.target.value));
        setCurrentPage(1);

    }

    function handleSortByTitle (e){
        e.preventDefault();
        dispatch(sortByTitle(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(orden)
    }

    function handleSortByRelease (e){
        e.preventDefault();
        dispatch(sortByRelease(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        console.log(orden)
    }

  return (
  <div>
    <div>
        <Link to={'/home'}><button>Back to Home</button></Link>
    </div>
    <div>
    <button onClick={e=>{handleClick(e)}}>Reload Books</button>
    </div>
    <div >
           <select onChange={e=> handleSortByTitle(e)}>
           <option value="" hidden>ABC</option>
            <option value='asc'>Increasing</option>
            <option value='desc'>Decreasing</option>
           </select>

           <select onChange={e=> handleSortByRelease(e)}>
           <option value="" hidden>Release date</option>
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
           booksPerPage={booksPerPage}
            allBooks={allBooks.length}
            paginado={paginado}
            currentPage={currentPage}/>
           </div>

           <div>
            {
            currentBook?.map(el=>{
                return(
                    <div key={el.id}>
                        <Card title={el.title} genre={el.genre} cover={el.cover} key={el.id} id={el.id} rating={el.rating} reviews={el.reviews} authors={el.authors} summary={el.summary}/>

                    </div>
                );
            })}
           </div>
    </div>
    
    
  </div>);
};

export default AllCards;
