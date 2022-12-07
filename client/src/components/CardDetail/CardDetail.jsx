import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function CardDetail() {
  const dispatch = useDispatch();

  let book;
  let reviews;

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      <div>
        <h1>{book.title}</h1>
        <h4>Author: {book.author}</h4>
        <h4>{book.rating}</h4>
      </div>
      <img src={book.cover} alt={book.title} />
      <h4>ISBN: {book.isbn}</h4>

      <h4>Category: {book.category}</h4>
      <h4>Publisher: {book.publisher}</h4>
      <h4>Description: {book.description}</h4>
      <h4>Reviews</h4>
      <div>
        {reviews?.map((r) => (
          <div>
            <div>{r.rating}</div>
            <div>{r.comment}</div>
            <div>{r.date}</div>
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
