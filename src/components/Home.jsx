import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { connect, useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Card from "./Card.jsx";
import CardRecommended from "./CardRecommended.jsx";
import SubscribeNav from "./SubscribeNav.jsx";
import Carousels from "./Carousels.jsx";
import CardDetail from "./CardDetail.jsx";

import {
  getAuthors,
  getBooks,
  getGenres,
  //getRecommendedBooks,
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

  const currentUser = useSelector((state) => state.currentUser);

  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  //const recommended = useSelector((state) => state.recommended);
  const news = useSelector((state) => state.news);
  const book = useSelector((state) => state.bookDetail);

  const [readeds, setReadeds] = useState(true);
  const [read, setRead] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const { user, logout } = useAuth0();

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
        {book && (
          <CardDetail
            book={book}
            readChange={readChange}
            read={read}
            readedsChange={readedsChange}
            readeds={readeds}
            favorites={favorites}
            favoritesChange={favoritesChange}
          />
        )}

        {/* <div>
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
        </div> */}
        <div
          style={{
            paddingTop: "80px",
          }}
        >
          {currentUser && currentUser.Reading?.length ? (
            <div>
              <Carousels
                key={"Reading"}
                books={currentUser.Reading}
                carTitle={"Continue reading"}
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
                  <div key={g.id + "div"}>
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
