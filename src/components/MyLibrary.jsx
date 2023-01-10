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

  currentUser && console.log("CURRENT USER LIBRARY: ", currentUser)

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

