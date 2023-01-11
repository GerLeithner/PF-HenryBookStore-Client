import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Card from "./Card.jsx";
import CardRecomended from "./CardRecomended.jsx";
import SubscribeNav from "./SubscribeNav.jsx";

import {
  getAuthors,
  getBooks,
  getGenres,
  getRecomendedBooks,
  getTrendingBooks,
  getNewsBooks,
  getCurrentUser,
} from "../redux/actions";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";
import "../styles/Carousel.css";

export default function Home() {
  const dispatch = useDispatch();
  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  console.log("currentUser ", currentUser);

  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recomended = useSelector((state) => state.recomended);
  const news = useSelector((state) => state.news);

  const [modal, setModal] = useState(false);
  const [read, setRead] = useState(true);
  const { user, logout } = useAuth0();

  const readChange = (condition) => {
    setRead(condition);
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
  }, [dispatch, read]);

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

  // carga los favs
  useEffect(() => {
    if (currentUser) {
      const userFavorites = currentUser.Favorites;
  
    let allFavorites=[]
   
    for (let i=0; i<currentUser.Favorites.length; i++){
     let fav= currentUser.Favorites[i].id
     allFavorites.push(fav)
    }
    setArrayFavorite(allFavorites)
    }
   },[ currentUser])

      let allFavorites = [];

      for (let i = 0; i < currentUser.Favorites?.length; i++) {
        let fav = currentUser.Favorites[i].id;
        allFavorites.push(fav);
      }
      setArrayFavorite(allFavorites);
    }


  }, [currentUser]);

  // carga los readed
  useEffect(() => {
    if (currentUser) {
      const userReaded = currentUser.Read;


      let allReaded = [];

      for (let i = 0; i < currentUser.Read?.length; i++) {
        let read = currentUser.Read[i].id;
        allReaded.push(read);
      }
      setArrayReaded(allReaded);
    }
  }, [currentUser]);
  console.log("Array READED", arrayReaded);

  // carga los reading
  useEffect(() => {
    if (currentUser) {
      const userReading = currentUser.Reading;
      let allReading = [];

      for (let i = 0; i < currentUser.Reading?.length; i++) {
        let reading = currentUser.Reading[i].id;
        allReading.push(reading);
      }
      setArrayReading(allReading);
    }
   },[ currentUser])



  return (
    <div>
      <div>
        <div>

         <SubscribeNav />
          {recomended && recomended?.length && (

            <Carousel
              key="recomended"
              itemsToShow={1}
              className="top-rec-wrapper "
            >
              {recomended.map((b) => {
                return (
                  <CardRecomended
                    key={b.id + "recommended"}
                    id={b.id}
                    title={b.title}
                    subtitle={b.subtitle}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genre={b.genre}
                    author={b.author}
                    back_cover={b.back_cover}
                    arrayFavorite={arrayFavorite}
                    arrayReaded={arrayReaded}
                    arrayReading={arrayReading}
                  />
                );
              })}
            </Carousel>
          )}
        </div>
        {currentUser && currentUser.Reading?.length ? (
          <div>
            <H2Home>Continue reading</H2Home>
            <Carousel key="reading" itemsToShow={5}>
              {currentUser.Reading.map((b) => {
                return (
                  <Card
                    id={b.id}
                    key={b.id + "Reading"}
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
                  />
                );
              })}
            </Carousel>
          </div>
        ) : (
          <></>
        )}
        <div>
          {trending?.length && (
            <>
              <H2Home>Trending</H2Home>
              <Carousel key="trending" itemsToShow={5}>
                {trending.map((b) => {
                  return (
                    <Card
                      key={b.id + "Trending"}
                      id={b.id}
                      title={b.title}
                      subtitle={b.subtitle}
                      publishedDate={b.publishedDate}
                      description={b.description}
                      averageRating={b.averageRating}
                      cover={b.cover}
                      genre={b.genre}
                      author={b.author}
                      back_cover={b.back_cover}
                      modal={modal}
                      setModal={setModal}
                      arrayFavorite={arrayFavorite}
                      arrayReaded={arrayReaded}
                      arrayReading={arrayReading}
                      readChange={readChange}
                      read={read}
                    />
                  );
                })}
              </Carousel>
            </>
          )}
        </div>
        <div>
          {news?.length && (
            <>
              <H2Home>News</H2Home>
              <Carousel key="news" itemsToShow={5}>
                {news.map((b) => {
                  return (
                    <Card
                      key={b.id + "News"}
                      id={b.id}
                      title={b.title}
                      subtitle={b.subtitle}
                      publishedDate={b.publishedDate}
                      description={b.description}
                      averageRating={b.averageRating}
                      cover={b.cover}
                      genre={b.genre}
                      author={b.author}
                      back_cover={b.back_cover}
                      modal={modal}
                      setModal={setModal}
                      arrayFavorite={arrayFavorite}
                      arrayReaded={arrayReaded}
                      arrayReading={arrayReading}
                      readChange={readChange}
                      read={read}
                    />
                  );
                })}
              </Carousel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */
