import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
  addReview,
  getAuthors,
  getBookById,
  getCurrentUser,
  getGenres,
} from "../redux/actions";

import {
  ErrorsForm,
} from "../styles/CreateBook";

import {
  NewReviewContainer,
  CancelButton,
  SubmitButton,
  Buttons,
  ReviewInput,
} from "../styles/Review";

import { toast } from "react-toastify";

function validate(input) {
  const regNum = new RegExp("^[0-5]+$");

  let errors = {};
  if (!input.comment) {
    errors.comment = "*comment is required field";
  }
  if (!input.score) {
    errors.score = "*score is a required field";
  } else if (!regNum.test(input.score)) {
    errors.scor = "*enter a valid score";
  } else if (input.score < 1 || input.score > 5) {
    errors.score = "*must be between 1 and 5";
  }

  return errors;
}

export default function CreateReview({ setNewReview, book, currentUser }) {

  console.log(currentUser);

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const authors = useSelector((state) => state.authors);

  const userId = currentUser && currentUser.id;
  const bookId = book && book.id;
  const [input, setInput] = useState({
    userId: userId,
    comment: "",
    score: 1,
  });

  const [errors, setErrors] = useState({});
  const { user } = useAuth0();

  useEffect(() => {
    if (!genres) dispatch(getGenres());
    if (!authors) dispatch(getAuthors());
  
    setErrors(validate(input));
  }, [dispatch, genres, authors, input]);

  function handleChange(e) {
    console.log(e)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log("ERRORS", errors);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    setErrors(
      validate({
        ...input,
      })
    );

    let errorsLength = Object.keys(errors).length;

    if (errorsLength > 0) {
      toast.error("One or more fields have errors, please check them");
    } else {
      setNewReview(false);
      dispatch(addReview(bookId, input));
      toast.success("Review has been posted");

      setTimeout(() => {
        dispatch(getBookById(book.id));
      }, 300);
      setTimeout(() => {
        const { email, nickname } = user;
        const userDb = {
          email,
          nickname,
        };
        dispatch(getCurrentUser(userDb));
      }, 300);

      setInput({
        userId: userId,
        comment: "",
        score: 1,
      });

      console.log("Entro a submitted???");
    }
  }

  function handleCancel(e) {}
  
  return (
    <NewReviewContainer>
      <span>{currentUser.userName.charAt(0).toUpperCase()+currentUser.userName.slice(1)}</span>
      <label>
        <span>Score </span>
        <select
          name="score"
          id="scoreInput"
          onChange={handleChange}
          defaultValue={1}
        >
          <option value={1}>1,0</option>
          <option value={2}>2,0</option>
          <option value={3}>3,0</option>
          <option value={4}>4,0</option>
          <option value={5}>5,0</option>
        </select>
      </label>
      {errors.score && <ErrorsForm>{errors.score}</ErrorsForm>}
      <ReviewInput 
       name="comment"
       placeholder="Leave a comment ..."
      //  onChange={(e) => handleChange(e)} 
        contentEditable="true"
        onInput={e => handleChange(e)}
       />
      <Buttons>
        <CancelButton onClick={(e) => handleCancel(e)}>
          cancel
        </CancelButton>
        <SubmitButton onClick={(e) => handleSubmit(e)}>
          submit
        </SubmitButton>
      </Buttons>
    </NewReviewContainer>
  );
}
