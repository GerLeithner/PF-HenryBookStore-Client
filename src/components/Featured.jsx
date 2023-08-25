import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Card from "./Card.jsx";
import CardRecommended from "./CardRecommended.jsx";
import SubscribeNav from "./SubscribeNav.jsx";
import Carousels from "./Carousels.jsx";

import {
  getAuthors,
  getBooks,
  getGenres,
  getRecommendedBooks,
  getTrendingBooks,
  getNewsBooks,
  getCurrentUser,
} from "../redux/actions";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";
import "../styles/Carousel.css";
import Catalogue from "./Catalogue.jsx";

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
  const recommended = useSelector((state) => state.recommended);
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
  }, [dispatch, read, arrayReading]);

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
    if (!recommended.length) {
      dispatch(getRecommendedBooks());
    }
  }, [dispatch]);

  // carga los favs
  useEffect(() => {
    if (currentUser) {
      const userFavorites = currentUser.Favorites;

      let allFavorites = [];
      let allReaded = [];
      let allReading = [];

      for (let i = 0; i < currentUser.Favorites?.length; i++) {
        let fav = currentUser.Favorites[i].id;
        allFavorites.push(fav);
      }
      setArrayFavorite(allFavorites);

      for (let i = 0; i < currentUser.Read?.length; i++) {
        let read = currentUser.Read[i].id;
        allReaded.push(read);
      }
      setArrayReaded(allReaded);

      for (let i = 0; i < currentUser.Reading?.length; i++) {
        let reading = currentUser.Reading[i].id;
        allReading.push(reading);
      }
      setArrayReading(allReading);
    }
  }, [currentUser]);

  return (
    <div>
      <div>
        <div>
          <SubscribeNav />
          {recommended && recommended?.length && (
            <Carousel
              key="recommended"
              itemsToShow={1}
              className="top-rec-wrapper "
            >
              {recommended.map((b) => {
                return (
                  <CardRecommended
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
            <Carousels
              books={currentUser.Reading}
              carTitle={"Continue reading"}
            ></Carousels>
          </div>
        ) : (
          <></>
        )}
        <div>
          {trending?.length && (
            <>
              <Carousels books={trending} carTitle={"Trending"}></Carousels>
            </>
          )}
        </div>
        <div>
          {news?.length && (
            <>
              <Carousels books={news} carTitle={"New Releases"}></Carousels>
            </>
          )}
        </div>
        <div>
          {allGenres.map((g) => {
            let booksByGenre = allBooks.filter((b) => {
              return b.genre.name === g.name;
            });
            return (
              <div>
                <Carousels
                  books={booksByGenre}
                  carTitle={g.name.charAt(0).toUpperCase() + g.name.slice(1)}
                ></Carousels>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */
