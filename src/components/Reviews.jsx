import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";

import {
  cleanBookDetail,
  deleteReview,
  getBookById,
  getCurrentUser,
  turnOffModal,
} from "../redux/actions";

import { ReviewContainer, ReviewHeader, CloseDetail, ReviewsList } from "../styles/Review";

import { H3 } from "../styles/Detail";

export default function Reviews({ book }) {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const [newReview, setNewReview] = useState(false);

  function handleCloseClick(e) {
    e.preventDefault(e);
    dispatch(turnOffModal());
    dispatch(cleanBookDetail(e.target.value));
  }

  // function handleDeleteReview(e) {
  //     e.preventDefault();
  //     console.log("e: ", e.target);
  //     dispatch(deleteReview(book.id, e.target.value));

  //     setTimeout(() => {
  //       dispatch(getBookById(book.id));
  //     }, 300);
  //     setTimeout(() => {
  //       const { email, nickname } = currentUser;
  //       const userDb = {
  //         email,
  //         nickname,
  //       };
  //       dispatch(getCurrentUser(userDb));
  //     }, 300);

  //     toast.success("Review Deleted Succesfully");
  //   }

  return (
    <ReviewContainer>
      <ReviewHeader>
        <div></div>
        <H3>Users Reviews</H3>
        <CloseDetail onClick={(e) => handleCloseClick(e)}>+</CloseDetail>
      </ReviewHeader>
      {book.reviews?.length === 0 && (
        <ReviewsList>
          <H3>This title hasn't any review yet</H3>
          <CreateReview currentUser={currentUser} setNewReview={setNewReview} />
        </ReviewsList>
      )}
    </ReviewContainer>
  );
}
