import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { 
    addReview,
    getAuthors,
    getGenres,
} from "../redux/actions";
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
  PropAndInputAndError
} from "../styles/CreateBook";

import {
  
    OverLay,
    ButtonCloseDetail,
    InfoContainerReview,
    
  } from "../styles/Detail";
function validate(input) {
  
  const regName = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regNum = new RegExp("^[0-5]+$");

  let errors = {};
  if(!input.comment) {
    errors.comment = "*comment is required field";
  }
  else if(!regName.test(input.comment)) {
    errors.comment = "*insert a valid comment";
  }
  if(!input.score) {
    errors.score = "*score is a required field";
  } 
  else if(!regNum.test(input.score)) {
    errors.scor = "*enter a valid score";
  }
  else if(input.score < 1 || input.score > 5) {
    errors.score = "*must be between 1 and 5";
  }
  
  return errors;
}

export default function CreateBook({ newReview, setNewReview , book, currentUser, modal, setModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const genres = useSelector(state => state.genres);
  const authors = useSelector(state => state.authors);
  

  const userId=currentUser && currentUser.id;
  currentUser && console.log("USERID review", userId)
  const  bookId=book && book.id
  const [input, setInput] = useState({
    userId: userId,
    comment: "",
    score: "",
  });

  const [errors, setErrors] = useState({});
  const { isAuthenticated, user, isLoading } = useAuth0();

  
  

  useEffect(() => {

    if(!genres) dispatch(getGenres());
    if(!authors) dispatch(getAuthors());

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
    setNewReview (false);
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
      alert("One or more fields have errors, please check them");
    }

    else{
        setNewReview(false);
        dispatch(addReview(bookId,input));
        alert("The Review has been added");
      
      
      setInput({
        userId: userId,
        comment: "",
        score: "",
        
      });
      
      
      history.push("/home"); 
      setModal(false);
    }
  }

 

  

  

  return (
 
    <FormContainer ancho={"720px"} alto="100px" justify="center">
        {/* <ButtonCloseDetail
                  onClick={(e) => {
                    handleCloseClick(e);
                  }}
                >
                  <img src={closeIcon} alt="n" />
                </ButtonCloseDetail> */}
      <ImageAndInfoContainer>
        
        <InfoContainerReview>
          {/* ----------------------------------------------------------------------*/}
          <PropAndInputAndError>
            <PropAndInput>
              <H3Form margenRig="30px" margenIzq="30px" alto="70px">Comment</H3Form>
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
          
            <PropAndInputAndError>
              <PropAndInput>
                <H3Form  margenRig="0px" margenIzq="30px" alto="70px">Score</H3Form>
                <FormInput
                  type="number"
                  value={input.score}
                  name="score"
                  min={1}
                  max={5}
                  onChange={(e) => handleChange(e)}
                  alto="100px"
                  ancho="100px"
                  margen="20px"
                  
                />
              </PropAndInput>
              {errors.score && <ErrorsForm>{errors.score}</ErrorsForm> }
            </PropAndInputAndError>
          
          {/* --------------------------------------------------------------------*/}
          
        </InfoContainerReview>
        
      </ImageAndInfoContainer>
      <ButtonForm type="button" onClick={(e) => handleSubmit(e)} ancho="100px" alto="20">
          Send Review
          </ButtonForm>
     
    </FormContainer>
  
  );
};

 