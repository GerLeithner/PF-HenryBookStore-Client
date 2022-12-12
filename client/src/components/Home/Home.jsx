import React from "react";
// import Card from "../Card/Card";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getBooks, getGenres, getAuthors, getTrendingBooks } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

import NavBar from "../NavBar/NavBar";
import Catalogue from "../Catalogue/Catalogue";


const Home = () => {
  // const [trendingSorted,setTrendingSorted]=useState([])
  const dispatch=useDispatch()
    const trending=useSelector((state)=>state.trending)
    // const allBooks=useSelector((state)=>state.books)
    const allGenres=useSelector((state)=>state.genres)
    const allAuthors=useSelector((state)=>state.authors)
//  const [allBooks2,setAllBooks2]=useState(allBooks)
// console.log(allBooks2)
    useEffect(()=>{
      dispatch(getGenres());
      dispatch(getBooks());
      dispatch(getTrendingBooks());

      // if(!allGenres.length){
      //   dispatch(getGenres());
      // }
      // if(!allAuthors.length){
      //   dispatch(getAuthors());
      // // }if(!allBooks.length){
      // //   dispatch(getBooks());
      // }if(!trending.length){
      //   dispatch(getTrendingBooks());
      // }
      
      
      // dispatch(getTrendingBooks());
  },[dispatch])


// function handleClick(e){
//   e.preventDefault();
//   if(!trending.length)
//   dispatch(getTrendingBooks());
// }



console.log("ALL AUTHORS:", allAuthors )
console.log("ALL GENRES:", allGenres)


    

    
    // console.log("ALLBOOKS2",allBooks2)
    
      // const allBooksTrending=allBooks
      //       console.log("allBooksTrending",allBooksTrending)
            // const sortByTrendings=allBooksTrending.sort(function (a,b){
            //     if(b.averageRating>a.averageRating){
            //       return 1;
            //   }
            //   if(a.averageRating>b.averageRating){
            //       return -1;
            //   }
            //   return 0;
            //   })
            //   console.log("TRENDINGSORT",sortByTrendings)
          
            //   const trending=[]
          
            //   for(let i=0;i<10;i++){
            //     trending.push(sortByTrendings[i])
            //     console.log("TRENDINGS:", trending[i])

            //   }
            //   if(!trendingSorted[0]){
            //     setTrendingSorted(trending)
            //   }

    // console.log("TRENDINGS:", trending)
    // console.log("TRENDINGSSORTED:", trendingSorted)
    
            

      
  return (
    // onPointerMove={e=>{handleClick(e)}}
  <div >
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
      
      {/* <button onClick={e=>{handleClick(e)}}>cargar trending</button> */}
       {
        trending.length ?trending.map(b=>{
                return(
                  
                    <div >
                        
                        <Card  
                        id={b.id} 
                        title={b.title} 
                        publishedDate={b.publishedDate} 
                        description={b.description} 
                        averageRating={b.averageRating} 
                        cover={b.cover} 
                        genres={b.genres} 
                        authors={b.authors}/>

                    </div>
                );
            })
        :<div>{console.log("FALLO TODO")}</div>
          }
    </div>
  </div>
  )
};

export default Home;
