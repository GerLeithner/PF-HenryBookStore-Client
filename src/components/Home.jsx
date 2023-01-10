import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useDispatch, useSelector } from "react-redux";

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
import Card from "./Card.jsx";
import CardRecomended from "./CardRecomended.jsx";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
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

  // function handleClick(e){
  //   e.preventDefault();
  //   if(!trending.length)
  //   dispatch(getTrendingBooks());
  // }

  return (
    <div>
      <div>
        <div>
          {recomended && recomended.length && (
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
          {trending.length && (
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
          {news.length && (
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
};

export default Home;

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */

// {currentUser && currentUser.Reading.length ? (
//             <>
//               <H2Home>Continue reading</H2Home>
//               <Carousel itemsToShow={5}>
//                 {currentUser.Reading.map((b) => {
//                   return (
//                     <Card
//                       id={b.id}
//                       key={b.id}
//                       title={b.title}
//                       publishedDate={b.publishedDate}
//                       description={b.description}
//                       averageRating={b.averageRating}
//                       cover={b.cover}
//                       genres={b.genres}
//                       authors={b.authors}
//                       modal={modal}
//                       setModal={setModal}
//                     />
//                   );
//                 })}
//               </Carousel>
//             </>
//           ) : (
//             <></>
//           )}
