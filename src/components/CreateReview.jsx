import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { addReview, getAuthors, getGenres } from "../redux/actions";
import closeIcon from "../icons/closeIcon.svg";

import {
  ButtonForm,
  FormInput,
  ErrorsForm,
  FormContainer,
  ImageAndInfoContainer,
  PropAndInput,
  FormTextArea,
  H3Form,
  PropAndInputAndError,
} from "../styles/CreateBook";

import {
  OverLay,
  ButtonCloseDetail,
  ButtonDetail,
  InfoContainerReview,
} from "../styles/Detail";
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

export default function CreateReview({
  newReview,
  setNewReview,
  book,
  currentUser,
  modal,
  setModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const genres = useSelector((state) => state.genres);
  const authors = useSelector((state) => state.authors);

  const userId = currentUser && currentUser.id;
  currentUser && console.log("USERID review", userId);
  const bookId = book && book.id;
  const [input, setInput] = useState({
    userId: userId,
    comment: "",
    score: 1,
  });

  const [errors, setErrors] = useState({});
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if (!genres) dispatch(getGenres());
    if (!authors) dispatch(getAuthors());

    setErrors(validate(input));
  }, [dispatch, genres, authors, input]);

  function handleChange(e) {
    console.log(e);
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
    console.log("input", input);
  }

  function handleCloseClick(e) {
    e.preventDefault(e);
    setNewReview(false);
    console.log("e.target.value", e.target.value);
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

      setInput({
        userId: userId,
        comment: "",
        score: 1,
      });

      //history.push("/home");
      //setModal(false);
    }
  }

  return (
    <div>
      <div onClick={(e) => handleCloseClick(e)} style={{ cursor: "pointer" }}>
        x
      </div>
      <ImageAndInfoContainer>
        <InfoContainerReview>
          {/* ----------------------------------------------------------------------*/}
          <PropAndInputAndError>
            <PropAndInput>
              <label>
                <span>Score </span>

                <select
                  name="score"
                  id="scoreInput"
                  onChange={handleChange}
                  defaultValue={5}
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </label>
            </PropAndInput>
            {errors.score && <ErrorsForm>{errors.score}</ErrorsForm>}
          </PropAndInputAndError>
          <PropAndInputAndError>
            <p>Your Review:</p>
            <PropAndInput>
              <FormTextArea
                type="text"
                value={input.comment}
                alto="50px"
                ancho="350px"
                name="comment"
                onChange={(e) => handleChange(e)}
                margen="0px"
              />
            </PropAndInput>
            <div>
              {errors.comment && <ErrorsForm>{errors.comment}</ErrorsForm>}
            </div>
          </PropAndInputAndError>
          {/* ----------------------------------------------------------------------*/}

          {/* --------------------------------------------------------------------*/}
        </InfoContainerReview>
      </ImageAndInfoContainer>
      <ButtonDetail
        type="button"
        onClick={(e) => handleSubmit(e)}
        ancho="100px"
        alto="20"
      >
        Submit
      </ButtonDetail>
    </div>
  );
}
