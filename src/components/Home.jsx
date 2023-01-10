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
} from "../redux/actions";

import Card from "./Card.jsx";
import CardRecomended from "./CardRecomended.jsx";

import { H3Form } from "../styles/CreateBook";
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";


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
    <>
      { currentUser ?
        <div>
          <div>
            {recomended && recomended.length && (
              <Carousel itemsToShow={1} className="top-rec-wrapper ">
                {recomended.map((b) => {
                  return (
                    <CardRecomended
                      key={b.id}
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
          <div>
            {trending.length && (
              <>
                <H2Home>Trending</H2Home>
                <Carousel itemsToShow={5}>
                  {trending.map((b) => {
                    return (
                      <Card
                        key={b.id}
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
                <Carousel itemsToShow={5}>
                  {news.map((b) => {
                    return (
                      <Card
                        key={b.id}
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
                      />
                    );
                  })}
                </Carousel>
              </>
            )}
          </div>
        </div> 
      : 
        <div style={{paddingTop: "200px"}}>
          <H3Form>LOADING...</H3Form>
        </div>
      }

    </>
  );
};

export default Home;

