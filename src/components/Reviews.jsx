import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";
import ReviewEdit from "./ReviewEdit.jsx";

import {
  cleanBookDetail,
  deleteReview,
  getBookById,
  getCurrentUser,
  turnOffModal,
} from "../redux/actions";

import {
  ReviewContainer,
  ReviewHeader,
  CloseDetail,
  ReviewsList,
} from "../styles/Review";

import { H3 } from "../styles/Detail";

export default function Reviews({ book }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const edit = useSelector((state) => state.edit);

  const [newReview, setNewReview] = useState(false);

  function handleCloseClick(e) {
    e.preventDefault(e);
    dispatch(turnOffModal());
    dispatch(cleanBookDetail(e.target.value));
  }

  return (
    <ReviewContainer>
      <ReviewHeader>
        <div></div>
        <H3>User Reviews</H3>
        <CloseDetail onClick={(e) => handleCloseClick(e)}>+</CloseDetail>
      </ReviewHeader>
      {book.reviews?.length === 0 && (
        <ReviewsList>
          <H3>This title doesn't have any review yet</H3>
          <CreateReview currentUser={currentUser} setNewReview={setNewReview} />
        </ReviewsList>
      )}
      {book.reviews?.length !== 0 &&
        book.reviews?.some((r) => r.userId === currentUser.id) && (
          <ReviewsList>
            {edit ? (
              <ReviewEdit
                r={book.reviews?.find((r) => r.userId === currentUser.id)}
                setNewReview={setNewReview}
              />
            ) : (
              <Review
                r={book.reviews?.find((r) => r.userId === currentUser.id)}
              />
            )}
            {book.reviews
              ?.filter((r) => r.userId !== currentUser.id)
              .map((r) => {
                return <Review r={r} id={r.id} />;
              })}
          </ReviewsList>
        )}
      {book.reviews?.length !== 0 &&
        !book.reviews?.some((r) => r.userId === currentUser.id) && (
          <ReviewsList>
            <CreateReview
              currentUser={currentUser}
              setNewReview={setNewReview}
            />
            {book.reviews?.map((r) => {
              return <Review key={r.id} r={r} id={r.id} />;
            })}
          </ReviewsList>
        )}
    </ReviewContainer>
  );
}
