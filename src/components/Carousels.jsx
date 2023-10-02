import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card.jsx";
import CardRecommended from "./CardRecommended.jsx";
import {
  getGenres,
  getAuthors,
  getTrendingBooks,
  getNewsBooks,
  getRecommendedBooks,
  getBooks,
} from "../redux/actions/index.js";
import { H2Home } from "../styles/Card.js";

export default function Carousels({ books, carTitle }) {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const allBooks = useSelector((state) => state.books);
  const trending = useSelector((state) => state.trending);
  const news = useSelector((state) => state.news);
  const recommended = useSelector((state) => state.news);
  const currentUser = useSelector((state) => state.currentUser);

  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const [modal, setModal] = useState(false);
  const [read, setRead] = useState(true);

  if (carTitle == "Continue reading") {
    console.log("Reading en carousels: ", books);
  }

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

  const readChange = (condition) => {
    setRead(condition);
  };
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
    <>
      <H2Home>{carTitle}</H2Home>
      <Carousel key={carTitle} itemsToShow={5}>
        {books.map((b) => {
          return (
            <Card
              key={b.id + carTitle}
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
  );
}
