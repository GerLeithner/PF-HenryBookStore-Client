import React from "react";
// import Card from "../Card/Card";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getBooks, getGenres, getAuthors, getTrendingBooks } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

import NavBar from "../NavBar/NavBar";


const Home = () => {
  const dispatch=useDispatch()

    const allBooks=useSelector((state)=>state.books)
    useEffect(()=>{
      dispatch(getBooks());

      
      
  },[dispatch])
console.log("ALLBOOKS HOME:",allBooks)
    // useEffect(()=>{
    //     dispatch(getTrendingBooks());
    // },[dispatch])

    // const trending=useSelector((state)=>state.trending)

    console.log("ALLBOOKS",allBooks)
    
      const allBooksTrending=allBooks
            console.log("allBooksTrending",allBooksTrending)
            const sortByTrendings=allBooksTrending.sort(function (a,b){
                if(b.averageRating>a.averageRating){
                  return 1;
              }
              if(a.averageRating>b.averageRating){
                  return -1;
              }
              return 0;
              })
              console.log("TRENDINGSORT",sortByTrendings)
          
              const trending=[]
          
              for(let i=0;i<10;i++){
                trending.push(sortByTrendings[i])
                console.log("TRENDINGS:", trending[i])
              }
    console.log("TRENDINGS:", trending)
    
            

      
  return (
  <div>
    <h1>Henry Book Store</h1>
    {/* <Card/> */}
    <div>

      <NavBar/>
    {/* <Link to={"/catalogue"} ><button>See Complete Catalogue</button></Link>
    <Link to={"/aboutUs"} ><button>About Us</button></Link>
    <Link to={"/create"} ><button>Add a new Book</button></Link> */}

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
