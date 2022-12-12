import React from "react";
// import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getGenres,
  getAuthors,
  getTrendingBooks,
} from "../../redux/actions";
import Card from "../Card/Card";
// import SearchBar from "../SearchBar/SearchBar";
import { ContainerCards } from "../styles/Card";
import NavBar from "../NavBar/NavBar";
// import Catalogue from "../Catalogue/Catalogue";
import { H1Form } from "../styles/CreateBook";

const Home = () => {
  // const [trendingSorted,setTrendingSorted]=useState([])

  const dispatch = useDispatch();
  const trending = useSelector((state) => state.trending);
  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  //  const [allBooks2,setAllBooks2]=useState(allBooks)
  // console.log(allBooks2)
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
  }, [dispatch]);

  // function handleClick(e){
  //   e.preventDefault();
  //   if(!trending.length)
  //   dispatch(getTrendingBooks());
  // }

  console.log("ALL AUTHORS:", allAuthors);
  console.log("ALL GENRES:", allGenres);

  return (
    // onPointerMove={e=>{handleClick(e)}}
    <div>
      {/* <Card/> */}
      <div>
        <NavBar />

        <div></div>
        <div>
          <H1Form>Trendings</H1Form>

          {/* <button onClick={e=>{handleClick(e)}}>cargar trending</button> */}
          <ContainerCards>
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
                  />
                );
              })
            ) : (
              <div>{console.log("FALLO TODO")}</div>
            )}
          </ContainerCards>
        </div>
      </div>
    </div>
  );
};

export default Home;
