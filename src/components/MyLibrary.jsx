import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  getAuthors,
  getBooks,
  getGenres,
  getRecomendedBooks,
  getTrendingBooks,
  getNewsBooks,
} from "../redux/actions";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";
import Card from "./Card.jsx";
import CardRecomended from "./CardRecomended.jsx";

const MyLibrary = () => {
  const dispatch = useDispatch();


  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser ", currentUser);
  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);

  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recomended = useSelector((state) => state.recomended);
  const news = useSelector((state) => state.news);
  
  const [modal, setModal] = useState(false);

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
    if (!trending.length) {
      dispatch(getTrendingBooks());
    }
    if (!news.length) {
      dispatch(getNewsBooks());
    }
    if (!recomended.length) {
      dispatch(getRecomendedBooks());
    }
  }, [dispatch]);

  // function handleClick(e){
  //   e.preventDefault();
  //   if(!trending.length)
  //   dispatch(getTrendingBooks());
  // }

  // currentUser && console.log("CURRENT USER LIBRARY: ", currentUser)

  // carga los favs
  useEffect(()=>{
    if(currentUser){
      const userFavorites = currentUser.Favorites
 
      // console.log("USER FAVORITES",userFavorites)
  
    let allFavorites=[]
   
  
    for (let i=0; i<currentUser.Favorites.length; i++){
     let fav= currentUser.Favorites[i].id
     allFavorites.push(fav)
    }
    setArrayFavorite(allFavorites)
    }
   },[ currentUser])
   
  //  console.log("Array FAVORITES",arrayFavorite)

   // carga los readed
   useEffect(()=>{
    if(currentUser){
      
    const userReaded =currentUser.Read

    let allReaded=[]
 
    for (let i=0; i<currentUser.Read.length; i++){
     let read= currentUser.Read[i].id
     allReaded.push(read)
    }
    setArrayReaded(allReaded)
    }
   },[ currentUser])
  //  console.log("Array READED",arrayReaded)

   // carga los reading
   useEffect(()=>{
    if(currentUser){
    const userReading = currentUser.Reading
    let allReading=[]
  
    for (let i=0; i<currentUser.Reading.length; i++){
     let reading= currentUser.Reading[i].id
     allReading.push(reading)
    }
    setArrayReading(allReading)
    }
   },[ currentUser])
  //  console.log("Array READING",arrayReading)

  return (
    <LibraryConteiner>
      <div>
      
        { currentUser && currentUser.Reading.length ? (
            <>
              <H2Home>Continue reading</H2Home>
              <Carousel itemsToShow={5}>
                {currentUser.Reading.map((b) => {
                  return (
                    <Card
                      id={b.id}
                      key={b.id}
                      title={b.title}
                      publishedDate={b.publishedDate}
                      description={b.description}
                      averageRating={b.averageRating}
                      cover={b.cover}
                      genres={b.genres}
                      authors={b.authors}
                      modal={modal}
                      setModal={setModal}
                      arrayFavorite={arrayFavorite}
                      arrayReaded={arrayReaded}
                      arrayReading={arrayReading}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <></>
          )}
        
        </div>

        <div>
      
        { currentUser && currentUser.Favorites.length ? (
            <>
              <H2Home>Your Favorites</H2Home>
              <Carousel itemsToShow={5}>
                {currentUser.Favorites.map((b) => {
                  return (
                    <Card
                      id={b.id}
                      key={b.id}
                      title={b.title}
                      publishedDate={b.publishedDate}
                      description={b.description}
                      averageRating={b.averageRating}
                      cover={b.cover}
                      genres={b.genres}
                      authors={b.authors}
                      modal={modal}
                      setModal={setModal}
                      arrayFavorite={arrayFavorite}
                      arrayReaded={arrayReaded}
                      arrayReading={arrayReading}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <></>
          )}
        
        </div>



        <div>
      
        { currentUser && currentUser.Read.length ? (
            <>
              <H2Home>To read again</H2Home>
              <Carousel itemsToShow={5}>
                {currentUser.Read.map((b) => {
                  return (
                    <Card
                      id={b.id}
                      key={b.id}
                      title={b.title}
                      publishedDate={b.publishedDate}
                      description={b.description}
                      averageRating={b.averageRating}
                      cover={b.cover}
                      genres={b.genres}
                      authors={b.authors}
                      modal={modal}
                      setModal={setModal}
                      arrayFavorite={arrayFavorite}
                      arrayReaded={arrayReaded}
                      arrayReading={arrayReading}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <></>
          )}
        
        </div>
      </LibraryConteiner>
    
  );
};

const LibraryConteiner = styled.div`
  padding-top: 90px;
 
  
  
`;

export default MyLibrary;

