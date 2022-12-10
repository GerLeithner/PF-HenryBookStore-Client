import React from "react";
// import Card from "../Card/Card";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getBooks, getGenres, getAuthors, getTrendingBooks } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch=useDispatch()

    const allBooks=useSelector((state)=>state.books)
    useEffect(()=>{
      dispatch(getBooks());
      dispatch(getTrendingBooks())
      
  },[])
// console.log("ALLBOOKS HOME:",allBooks)
//     useEffect(()=>{
//         dispatch(getTrendingBooks());
//     },[dispatch])

    const trending=useSelector((state)=>state.trending)

    console.log("TRENDINGS:", trending)
  return (
  <div>
    <h1>Henry Book Store</h1>
    {/* <Card/> */}
    <div>
    <Link to={"/catalogue"} ><button>See Complete Catalogue</button></Link>
    <Link to={"/aboutUs"} ><button>About Us</button></Link>
    <Link to={"/create"} ><button>Add a new Book</button></Link>
    </div>
    <div>
      <h3>Trendings</h3>
      
      {/* {
        trending?.map(b=>{
                return(
                  // key={b.id}
                    <div>
                        
                        <Card id={b.id} title={b.title} publishedDate={b.publishedDate} description={b.description} averageRating={b.averageRating} cover={b.cover} genre={b.genre} author={b.author}/>

                    </div>
                );
            })
        } */}
    </div>
  </div>
  )
};

export default Home;
