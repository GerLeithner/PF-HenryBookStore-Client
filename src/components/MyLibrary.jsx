import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAuthors,
  getBooks,
  getGenres,
  getRecomendedBooks,
  getTrendingBooks,
  getNewsBooks,
  getCurrentUser
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
  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);

  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recomended = useSelector((state) => state.recomended);
  const news = useSelector((state) => state.news);
  const { user, logout } = useAuth0();
  
  const [modal, setModal] = useState(false);
  const readChange = (condition) => {
    setRead(condition);
  };

  const readedsChange = (condition) => {
    setReadeds(condition);
  };

  const favoritesChange = (condition) => {
    setFavorites(condition);
  };

  useEffect(() => {
    if (user) {
      const { email, nickname } = user;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }
  }, [dispatch, read, readeds, favorites]);
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
      <H2Home>Continue reading</H2Home>
        { currentUser && currentUser.Reading.length ? (
            <>
              
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
                      readChange={readChange}
                      read={read}
                      readedsChange={readedsChange}
                      readeds={readeds}
                      favorites={favorites}
                      favoritesChange={favoritesChange}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <div><h3>You don't start reading yet!</h3></div>
          )}
        
        </div>

        <div>
        <H2Home>Your Favorites</H2Home>
        { currentUser && currentUser.Favorites.length ? (
            <>
            
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
                      readChange={readChange}
                      read={read}
                      readedsChange={readedsChange}
                      readeds={readeds}
                      favorites={favorites}
                      favoritesChange={favoritesChange}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <div><h3>You don't have favorites yet, go find some!!</h3></div>
          )}
        
        </div>



        <div>
        <H2Home>To read again</H2Home>
        { currentUser && currentUser.Read.length ? (
            <>
              
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
                      readChange={readChange}
                      read={read}
                      readedsChange={readedsChange}
                      readeds={readeds}
                      favorites={favorites}
                      favoritesChange={favoritesChange}
                    />
                  );
                })}
              </Carousel>
            </>
          ) : (
            <div> <h3> You haven't read some books yet</h3></div>
          )}
        
        </div>
      </LibraryConteiner>
    
  );
};

const LibraryConteiner = styled.div`
  padding-top: 90px;
 
  
  
`;

export default MyLibrary;

