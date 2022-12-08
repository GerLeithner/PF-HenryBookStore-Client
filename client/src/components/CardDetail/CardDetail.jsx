import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CardDetail() {
  const dispatch = useDispatch();

  let book;
  let reviews;
  let genre;

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      <div>
        <h1>{book.title}</h1>
        <h4>Author: {book.author}</h4>
        <h4>{book.rating}</h4>
      </div>
      <img src={book.cover} alt={book.title} />
      <h4>ISBN: {book.id}</h4>
      <h4>Genre: {book.genre}</h4>
      {
        genre?.map((g)=>(
          <div>
            <div>
              <h4>{g.name}</h4>
            </div>
            
          </div>
        ))
       }
      <h4>Publisher: {book.publisher}</h4>
      <h4>Release Date: {book.releaseDate}</h4>
      <h4>Description: {book.description}</h4>
      <h4>Reviews</h4>
      <div>
        {reviews?.map((r) => (
          <div>
            <div>{r.score}</div>
            <div>{r.comment}</div>
            <div>{r.create_date}</div>
          </div>
        ))}
      </div>

      <button>
        <h3>Post your review</h3>
      </button>


      <Link to={"/home"}>
        <button>{"<-"} Volver</button>
      </Link>
    </div>
  );
}
