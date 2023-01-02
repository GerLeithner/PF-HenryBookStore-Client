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
import { H2Home } from "../styles/Card";
import "../styles/Carousel.css";
import Card from "./Card.jsx";
import CardDetail from "./CardDetail.jsx";
import CardRecomended from "./CardRecomended.jsx";

const Home = () => {
  // const [trendingSorted,setTrendingSorted]=useState([])

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  const recomended = useSelector((state) => state.recomended);
  const detailBook = useSelector((state) => state.bookDetail);
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
    <div>
      <div>
        <div>
          <CardDetail book={detailBook} modal={modal} setModal={setModal} />
          <Carousel itemsToShow={1} className="top-rec-wrapper ">
            {recomended.length ? (
              recomended.map((b) => {
                return (
                  <CardRecomended
                    id={b.id}
                    key={b.id}
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
              })
            ) : (
              <></>
            )}
          </Carousel>
        </div>
        <div>
          {currentUser && currentUser.Reading ? (
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
          <H2Home>Trendings</H2Home>

          <Carousel itemsToShow={5}>
            {trending.length ? (
              trending.map((b) => {
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
              })
            ) : (
              <></>
            )}
          </Carousel>

          <H2Home>News</H2Home>

          <Carousel itemsToShow={5}>
            {news.length ? (
              news.map((b) => {
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
              })
            ) : (
              <></>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};



export default Home;

/* export default withAuthenticationRequired(Home, {
  onRedirecting: () => <LandingPage />,
}); */
