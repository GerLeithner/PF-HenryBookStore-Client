import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import SubscribeNav from "./SubscribeNav.jsx";
import Carousels from "./Carousels.jsx";
import CardDetail from "./CardDetail.jsx";

import {
  getAuthors,
  getBooks,
  getGenres,
  getTrendingBooks,
  getNewsBooks,
  getCurrentUser,
} from "../redux/actions";

import { CarouselContainer } from "../styles/Home";

import "../styles/Carousel.css";

export default function Home() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const loading = useSelector((state) => state.loading);
  //const recommended = useSelector((state) => state.recommended);
  const news = useSelector((state) => state.news);
  const book = useSelector((state) => state.bookDetail);
  const modal = useSelector((state) => state.modal);

  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const { user, logout, isAuthenticated } = useAuth0();
  const [trendingCar, setTendingCar] = useState(true);
  const subNav = useSelector((state) => state.subscribe);

  const readChange = () => {
    setRead((prevRead) => !prevRead);
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
    setTimeout(() => {
      if (!allBooks.length) {
        dispatch(getBooks());
      }
    }, 300);

    setTimeout(() => {
      if (!trending.length) {
        dispatch(getTrendingBooks());
      }
    }, 300);

    setTimeout(() => {
      if (!news.length) {
        dispatch(getNewsBooks());
      }
    }, 300);

    /*    setTimeout(() => {
      if (!recommended.length) {
        dispatch(getRecommendedBooks());
      }
    }, 300); */
  }, [dispatch]);

  return (
    <div>
      <div>
        <SubscribeNav />
        <div
          style={{
            paddingTop: subNav
              ? modal
                ? "100px"
                : "120px"
              : modal
              ? "50px"
              : "80px",
            paddingBottom: "40px",
          }}
        >
          <CardDetail
            book={book}
            readChange={readChange}
            read={read}
            readedsChange={readedsChange}
            readeds={readeds}
            favorites={favorites}
            favoritesChange={favoritesChange}
          />
          {currentUser && currentUser.Reading?.length ? (
            <div>
              <Carousels
                key={"Reading"}
                books={currentUser.Reading}
                carTitle={"Continue Reading"}
                readChange={readChange}
              ></Carousels>
            </div>
          ) : (
            <></>
          )}
          <div>
            {trending?.length && (
              <>
                <Carousels
                  key={"Trending"}
                  books={trending}
                  carTitle={"Trending"}
                  readChange={readChange}
                ></Carousels>
              </>
            )}
          </div>
          <div>
            {news?.length && (
              <>
                <Carousels
                  key={"New Releases"}
                  books={news}
                  carTitle={"New Releases"}
                  readChange={readChange}
                ></Carousels>
              </>
            )}
          </div>
          {
            <div key={"Genres Div"}>
              {allGenres.map((g) => {
                let booksByGenre = allBooks.filter((b) => {
                  return b.genre.name === g.name;
                });
                return (
                  <div key={g.name}>
                    <Carousels
                      books={booksByGenre}
                      carTitle={
                        g.name.charAt(0).toUpperCase() + g.name.slice(1)
                      }
                      readChange={readChange}
                    ></Carousels>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */
