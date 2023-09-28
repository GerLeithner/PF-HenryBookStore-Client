import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
  addReview,
  editReview,
  getAuthors,
  getBookById,
  getCurrentUser,
  getGenres,
  editState
} from "../redux/actions";

import {
  NewReviewContainer,
  ReviewButton,
  Buttons,
  ReviewInput,
  StyledSelect,
  StyledOption
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

export default function ReviewEdit({ setNewReview, r }) {


  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const authors = useSelector((state) => state.authors);
  const book = useSelector((state) => state.bookDetail);

  const bookId = book && book.id;
  const [input, setInput] = useState({
    id: r?.id,
    comment: r?.comment,
    score: r?.score,
  });

  const textareaRef  = useRef(null);
  const [errors, setErrors] = useState({});
  const { user } = useAuth0();
  const [isFocused, setIsFocused] = useState(true);
  

  useEffect(() => {
    if (!genres) dispatch(getGenres());
    if (!authors) dispatch(getAuthors());
    if(!book) dispatch()
  
    setErrors(validate(input));
  }, [dispatch, genres, authors, input]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1; // Asegúrate de que comience con un solo renglón
      const maxRows = 3; // Establece un número máximo de renglones si lo deseas
      const minHeight = 25; // Establece la altura mínima deseada en píxeles
      const maxHeight = textareaRef.current.scrollHeight;

      if (maxHeight > minHeight) {
        const newRows = Math.min(maxRows, Math.ceil(maxHeight / minHeight));
        textareaRef.current.rows = newRows;
      }
    }
  }, [input.comment])

  useEffect(() => {
    const textarea = textareaRef.current;
    const length = textarea.value.length;

    // Coloca el foco al final del texto en el textarea
    textarea.setSelectionRange(length, length);
    textarea.focus();
  }, []);

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
      dispatch(editReview(bookId, input));
      toast.success("Review has been updated");

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
        userId: r.userId,
        comment: "",
        score: 1,
      });

      dispatch(editState(false));
    }
  }

  function handleCancel(e) {
    setIsFocused(false);
    setInput({
      ...input,
      comment: "",
      score: 1,
    })
    dispatch(editState(false));
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // No hagas nada cuando el textarea pierde el enfoque
  };
  
  return (
    <NewReviewContainer>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
      <span>{r.user.userName.charAt(0).toUpperCase()+r.user.userName.slice(1)}</span>
      <label style={{display: "flex", gap: "20px", alignItems: "flex-start"}}>
        <span>Score :</span>
        <StyledSelect
          name="score"
          id="scoreInput"
          onChange={handleChange}
          defaultValue={1}
          value={input.score}
        >
          <StyledOption value={1}>1,0</StyledOption>
          <StyledOption value={2}>2,0</StyledOption>
          <StyledOption value={3}>3,0</StyledOption>
          <StyledOption value={4}>4,0</StyledOption>
          <StyledOption value={5}>5,0</StyledOption>
        </StyledSelect>
      </label>
      </div>
      <ReviewInput
        ref={textareaRef }
        value={input.comment}
        name="comment"
        placeholder="Leave a comment ..."
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
       />
      {isFocused && (
        <Buttons>
        <ReviewButton onClick={(e) => handleCancel(e)} backColor="#3F3F3F" hoverColor="#6F6F6F">
          Cancel
        </ReviewButton>
        <ReviewButton onClick={(e) => handleSubmit(e)}>
          Submit
        </ReviewButton>
      </Buttons>
      )}

    </NewReviewContainer>
  );
}