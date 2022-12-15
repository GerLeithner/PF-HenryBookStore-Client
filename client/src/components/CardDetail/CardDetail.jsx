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
import {
  DetailContainer,
  FormInput,
  GenresContainer,
  H1Detail,
  InfoSeccion,
} from "../styles/Detail";
import { ButtonCatalogue } from "../styles/Catalogue";

export default function CardDetail(props) {
  const dispatch = useDispatch();
  const bookId = props.match.params.id;
  console.log("BOOK ID:", bookId);
  // console.log("PROPS",props)

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
      <DetailContainer>
      <InfoSeccion>
        <H1Detail>{book.title}</H1Detail>
        </InfoSeccion>
        {/* <InfoSeccion>
             <h4>ID: {book.id}</h4>
      </InfoSeccion> */}
        <InfoSeccion>
        <h4>Authors:</h4>
        {book && book.author &&(
          <h4>{book.author.name}</h4>
        )}
        </InfoSeccion>
        <InfoSeccion>
        <h4>Rating:</h4>
        <h4>{book.averageRating}</h4>
        </InfoSeccion>
        <InfoSeccion>
      
         <img src={book.cover} alt={book.title} />
      </InfoSeccion>
      
      <InfoSeccion>
      <h4>Genre:</h4>
      
        {book && book.genre &&(
          <h4>{book.genre.name}</h4>
        )}
      </InfoSeccion>
      <InfoSeccion>
      <h4>Publisher: {book.publisher}</h4>
      </InfoSeccion>
      <InfoSeccion>
      <h4>Release Date: {book.releaseDate}</h4>
      </InfoSeccion>
      <InfoSeccion>
      <h4>Description: </h4>
      <h4>{book.description}</h4>
      </InfoSeccion>
      <InfoSeccion>
      <h4>Reviews</h4>
      
        {/* {reviews?.map((r) => (
          <div>
            <div>{r.score}</div>
            <div>{r.comment}</div>
            <div>{r.create_date}</div>
          </div>
        ))} */}
      
      </InfoSeccion>

      {/* <button>
        <h3>Post your review</h3>
      </button> */}
</DetailContainer>
      <Link to={"/home"}>
        <ButtonCatalogue>{"<-"} Volver</ButtonCatalogue>
      </Link>
    </div>
  );
}
