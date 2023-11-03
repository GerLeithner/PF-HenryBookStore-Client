import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
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
import Card from "./Card.jsx";
import CardRecommended from "./CardRecommended.jsx";
import CardDetail from "./CardDetail";

const MyLibrary = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);

  const book = useSelector((state) => state.bookDetail);
  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recommended = useSelector((state) => state.recommended);
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
    /*     if (!recommended.length) {
      dispatch(getRecommendedBooks());
    } */
  }, [dispatch]);

  return (
    <div>
      <div>
        <CardDetail
          book={book}
          readChange={readChange}
          read={read}
          readedsChange={readedsChange}
          readeds={readeds}
          favorites={favorites}
          favoritesChange={favoritesChange}
        />
        <div
          style={{
            paddingTop: "80px",
          }}
        ></div>
        <H2Home>Continue reading</H2Home>
        {currentUser && currentUser.Reading.length ? (
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
          <div>
            <h3>No books are being read yet</h3>
          </div>
        )}
      </div>

      <div>
        <H2Home>Your Favorites</H2Home>
        {currentUser && currentUser.Favorites.length ? (
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
          <div>
            <h3>You don't have any favorites yet</h3>
          </div>
        )}
      </div>

      <div>
        <H2Home>Read again</H2Home>
        {currentUser && currentUser.Read.length ? (
          <>
            <Carousel itemsToShow={5}>
              {currentUser.Read.map((b) => {
                console.log("favoritesChange type:", typeof favoritesChange);

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
          <div>
            {" "}
            <h3>You haven't read any books yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
