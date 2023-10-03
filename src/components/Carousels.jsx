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

  const [modal, setModal] = useState(false);
  const [read, setRead] = useState(true);

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
    console.log("Se re renderiza Carousels?");
  }, [dispatch, read]);

  const readChange = (condition) => {
    console.log("Entro acá");
    setRead(condition);
  };

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
              readChange={readChange}
              read={read}
            />
          );
        })}
      </Carousel>
    </>
  );
}
