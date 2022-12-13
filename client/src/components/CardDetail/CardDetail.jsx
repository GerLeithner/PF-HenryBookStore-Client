import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {
  cleanDetail,
  getGenres,
  getAuthors,
  bookDetail,
} from "../../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  const bookId = props.match.params.id;
  console.log("BOOK ID:", bookId);

  const book = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAuthors());
    dispatch(bookDetail(bookId));

    return () => {
      console.log("Detail Clean Up");
      dispatch(cleanDetail());
    };
  }, [dispatch, bookId]);

  return (
    <div>
      <NavBar />
      <div>
        <h1>{book.title}</h1>
        <h4>Authors:</h4>
        <div>
          {book.authors?.map((a) => (
            <h4>{a.name}</h4>
          ))}
        </div>

        <h4>{book.averageRating}</h4>
      </div>
      <img src={book.cover} alt={book.title} />
      <h4>ID: {book.id}</h4>
      <h4>Genre:</h4>
      <div>
        {book.genres?.map((g) => (
          <h4>{g.name}</h4>
        ))}
      </div>
      <h4>Publisher: {book.publisher}</h4>
      <h4>Release Date: {book.releaseDate}</h4>
      <h4>Description: </h4>
      <h4>{book.description}</h4>
      <h4>Reviews</h4>
      <div>
        {/* {reviews?.map((r) => (
          <div>
            <div>{r.score}</div>
            <div>{r.comment}</div>
            <div>{r.create_date}</div>
          </div>
        ))} */}
      </div>

      {/* <button>
        <h3>Post your review</h3>
      </button> */}

      <Link to={"/home"}>
        <ButtonCatalogue>{"<-"} Volver</ButtonCatalogue>
      </Link>
    </div>
  );
}
