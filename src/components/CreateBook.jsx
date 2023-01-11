import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

import { 
  getAuthors,
  getGenres, 
  createBook, 
  editBook, 
  disableBook, 
  cleanBookDetail 
} from "../redux/actions";

import BookReviews from "./BookReviews";

import {
  DescriptionContainer,
  ButtonForm,
  DropDownSelect, 
  FormInput, 
  ErrorsForm,
  FormContainer, 
  ImageAndInfoContainer,
  BookImage,
  InfoContainer,
  PropAndInput,
  FormTextArea,
  H3Form,
  PropAndInputAndError,
  BookCoverInput
} from "../styles/CreateBook";
import { RowSearchBar } from "../styles/SearchBar";

function validate(input) {
  const imgVal = /(https?:\/\/)?([\w])+\.{1}([a-zA-Z]{2,63})([\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
  const regName = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regNum = new RegExp("^[0-9]+$");

  let errors = {};
  if(!input.cover) {
    errors.cover = "*cover is required field";
  }
  else if(!imgVal.test(input.cover)) {
    errors.cover = "*insert a valid link";
  }
  if(!input.title) {
    errors.title = "*title is a required filed";
  } 
  else if(!regName.test(input.title)) {
    errors.title = "*enter a valid title";
  }
  if(!input.authorName) {
    errors.authorName = "*author is a required field";
  }
  else if(!regName.test(input.authorName)) {
    errors.authorName = "*enter a valid author";
  }
  if(!input.genreName) {
    errors.genreName = "*genre is a required field";
  }
  else if(input.pages > 20000 || input.pages < 1 || !regNum.test(input.pages)) {
    errors.pages = "*must be betwen 1 and 20000";
  }
  if(input.publishedDate < 0 || input.publishedDate > 2023) {
    errors.publishedDate = "*must be between 0 and 2023";
  }
  if(!input.publishedDate) {
    errors.publishedDate = "*year is a required field";
  }
  if(!input.publisher) {
    errors.publisher = "*publisher is a required field";
  }
  if(!input.averageRating) {
    errors.averageRating = "*rating is a required field";
  }
  if(input.averageRating < 1 || input.averageRating > 5) {
    errors.averageRating = "*must be between 1 and 5";
  }
  if(!input.description) {
    errors.description = "*description is a required field";
  }
  
  return errors;
}

export default function CreateBook({ setModal, newBook, setNewBook }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const genres = useSelector(state => state.genres);
  const authors = useSelector(state => state.authors);
  const book = useSelector(state => state.bookDetail);

  const [input, setInput] = useState({
    id: "",
    title: "",
    subtitle: "",
    publishedDate: "",
    publisher: "",
    description: "",
    pages: "",
    averageRating: "",
    usersRating: "",
    cover: "",
    identifier: "",
    genreName: "",
    authorName: ""
  });

  const [errors, setErrors] = useState({});
  const [reviews, setReviews] = useState(false);

  useEffect(() => {
    if(book && book.author && book.genre) {
      setInput(prev => ({
        ...prev,
        id: book.id,
        title: book.title,
        subtitle: book.subtitle ? book.subtitle : "not specified",
        publishedDate: book.publishedDate,
        publisher: book.publisher,
        description: book.description,
        pages: book.pages,
        averageRating: book.averageRating ? book.averageRating : 1,
        usersRating: book.usersRating,
        cover: book.cover,
        identifier: book.identifier,
        genreName: book.genre.name,
        authorName: book.author.name
      }))
      setReviews(false);
    }
  }, [book]);

  useEffect(() => {
    if(newBook) {
      setInput(prev => ({
        ...prev,
        id: "",
        title: "",
        subtitle: "",
        publishedDate: "",
        publisher: "",
        description: "",
        pages: "",
        averageRating: "",
        usersRating: "",
        cover: "",
        identifier: "",
        genreName: "",
        authorName: ""
      }));
    }
  }, [newBook]);

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

  async function handlePicChange(e) {
    e.preventDefault();

    if (e.target.files[0]) {
      const imageRef = ref(storage, `${book.id}/coverPic`);
      await uploadBytes(imageRef, e.target.files[0]).then(() => {

        getDownloadURL(imageRef).then((url) => {
        setInput({ ...input, cover: url})

      })});
    }
  }

  function handleAuthor(e) {

    if(e.target.value) {
      setInput({
        ...input,
        authorName: e.target.value,
      });
      console.log("ERRORS", errors);
      setErrors(
        validate({
          ...input,
          authorName: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        authorName: e.target.textContent,
      });
      console.log("ERRORS", errors);
      setErrors(
        validate({
          ...input,
          authorName: e.target.textContent,
        })
      );
    }
  }

  function handleGenre(e) {

    if(e.target.value) {
      setInput({
        ...input,
        genreName: e.target.value,
      });
      console.log("ERRORS", errors);
      setErrors(
        validate({
          ...input,
          genreName: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        genreName: e.target.textContent,
      });
      console.log("ERRORS", errors);
      setErrors(
        validate({
          ...input,
          genreName: e.target.textContent,
        })
      );
    }
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
      if(newBook) {
        dispatch(createBook(input));
        alert("The Book has been created");
      }
      if(!newBook) {
        console.log("dispache edit")
        dispatch(editBook(input));
        alert("The Book has been edited");
      }
      setInput({
        title: "",
        publishedDate: "",
        publisher: "",
        description: "",
        pages: "",
        averageRating: "",
        usersRating: "",
        cover: "",
        identifier: "",
        genreName: "",
        authorName: "",
      });
      setNewBook(false);
      setModal(false);
      history.push("/books"); 
    }
  }

  function handleReset(e) {
    e.preventDefault();
    setNewBook(true)
    setInput({
      id: "",
      title: "",
      subtitle: "",
      publishedDate: "",
      publisher: "",
      description: "",
      pages: "",
      averageRating: "",
      usersRating: "",
      cover: "",
      identifier: "",
      genreName: "",
      authorName: "",
    });
  }

  function handleDisable(e) {
    e.preventDefault();
    dispatch(disableBook(input.id))
    alert(book.active ? "Book has been disable" : "Book has been activated");    
    setInput({
      title: "",
      subtitle: "",
      publishedDate: "",
      publisher: "",
      description: "",
      pages: "",
      averageRating: "",
      usersRating: "",
      cover: "",
      identifier: "",
      genreName: "",
      authorName: "",
    });
    setModal(false);
  }

  function handleReviews(e) {
    e.preventDefault();
    setReviews(!reviews);
  }

  function close(e) {
    e.preventDefault();
    dispatch(cleanBookDetail())
    setModal(false);
  }

  return (
    <FormContainer>
      {!book.active && 
        <div style={{alignSelf: "center"}}>
          <ErrorsForm>*the current book is disabled</ErrorsForm>
        </div> 
      }
      <ImageAndInfoContainer>
        <div>
          {
            input.cover ?
            <BookImage
            src={input.cover}
            alt="SelectedImage"
            /> : 
            <BookImage alt="defaultImage"/>
          }
          <BookCoverInput>
            Select
            <input
              style={{width: "0px", height: "0px"}}
              text="Change"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handlePicChange(e)}
            />
          </BookCoverInput>
        </div>
        <InfoContainer>
          {/* ----------------------------------------------------------------------*/}
          <PropAndInputAndError name="title">
            <PropAndInput>
              <H3Form>Title</H3Form>
              <FormInput
                type="text"
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}
                margen="20px"
              />
            </PropAndInput>
            <div>
              {errors.title && <ErrorsForm>{errors.title}</ErrorsForm>}
            </div>
          </PropAndInputAndError>
          {/* ----------------------------------------------------------------------*/}
          <PropAndInput name="subtitle">
            <PropAndInputAndError>
              <PropAndInput>
                <H3Form>Subtitle</H3Form>
                <FormInput
                  type="text"
                  value={input.subtitle}
                  name="subtitle"
                  onChange={(e) => handleChange(e)}
                  ancho="280px"
                  margen="20px"
                />
              </PropAndInput>
            </PropAndInputAndError>
            {/* ----------------------------------------------------------------------*/}
            <PropAndInputAndError>
              <PropAndInput>
                <H3Form  margenIzq="25px">Identifier</H3Form>
                <FormInput
                  type="text"
                  value={input.identifier}
                  name="identifier"
                  onChange={(e) => handleChange(e)}
                  ancho="280px"
                  margen="20px"
                />
              </PropAndInput>
              {errors.identifier && <ErrorsForm>{errors.identifier}</ErrorsForm> }
            </PropAndInputAndError>
          </PropAndInput>
          {/* --------------------------------------------------------------------*/}
            <PropAndInput name="author">
              <PropAndInputAndError>
                <PropAndInput>
                  <H3Form margenRig="10px">Author</H3Form>
                  <FormInput
                    type="text"
                    value={input.authorName}
                    name="authorName"
                    onChange={(e) => handleAuthor(e)}
                    autoComplete="off"
                    ancho="280px"
                    margen="20px"
                  />
                </PropAndInput>
                <DropDownSelect>
                  {authors
                  .filter((author) => {
                    const searchTerm = input.authorName.toLowerCase();
                    const nameOfAuthor = author.name.toLowerCase();
                    return (
                      searchTerm &&
                      nameOfAuthor.includes(searchTerm) &&
                      nameOfAuthor !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((author, i) => (
                    <RowSearchBar
                      name="authorName"
                      onClick={(e) => handleAuthor(e)}
                      key={i}
                      value={input.authorName}
                    >
                      {author.name}
                    </RowSearchBar>
                  ))}
                </DropDownSelect>
                { errors.authorName && <ErrorsForm>{errors.authorName}</ErrorsForm> }
              </PropAndInputAndError>
              {/*-------------------------------------------------------------------*/}
              <PropAndInputAndError>
                <PropAndInput>
                  <H3Form >Year</H3Form>
                  <FormInput
                    type="number"
                    value={input.publishedDate}
                    name="publishedDate"
                    min={0}
                    max={2023}
                    onChange={handleChange}
                    ancho="280px"
                    margen="20px"
                  />
                </PropAndInput>
                {errors.publishedDate && <ErrorsForm>{errors.publishedDate}</ErrorsForm> }
              </PropAndInputAndError>
            </PropAndInput>
          {/* -----------------------------------------------------------------------*/}
          <PropAndInput name="publisher">
            <PropAndInputAndError>
              <PropAndInput>
                <H3Form>Publisher</H3Form>
                <FormInput
                  type="text"
                  value={input.publisher}
                  name="publisher"
                  onChange={(e) => handleChange(e)}
                  ancho="280px"
                  margen="10px"
                />
              </PropAndInput>
              { errors.publisher && <ErrorsForm>{errors.publisher}</ErrorsForm>}
            </PropAndInputAndError>
            {/* -----------------------------------------------------------------------*/}
            <PropAndInputAndError>
                <PropAndInput>
                  <H3Form>Genre</H3Form>
                  <FormInput
                    type="text"
                    value={input.genreName}
                    name="genreName"
                    onChange={(e) => handleGenre(e)}
                    autoComplete="off"
                    ancho="280px"
                    margen="20px"
                  />
                </PropAndInput>
                <DropDownSelect>
                  {genres
                  .filter((genre) => {
                    const searchTerm = input.genreName.toLowerCase();
                    const nameOfgenre = genre.name.toLowerCase();
                    return (
                      searchTerm &&
                      nameOfgenre.includes(searchTerm) &&
                      nameOfgenre !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((genre, i) => (
                    <RowSearchBar
                      name="genreName"
                      onClick={(e) => handleGenre(e)}
                      key={i}
                      value={input.genreName}
                    >
                      {genre.name}
                    </RowSearchBar>
                  ))}
                </DropDownSelect>
                { errors.genreName && <ErrorsForm>{errors.genreName}</ErrorsForm> }
              </PropAndInputAndError>
          </PropAndInput>
          {/* -----------------------------------------------------------------------*/}
          <PropAndInput>
          <PropAndInputAndError name="pages">
            <PropAndInput>
              <H3Form>Pages</H3Form>
              <FormInput
                type="number"
                max={20000}
                min={1}
                value={input.pages}
                name="pages"
                onChange={(e) => handleChange(e)}
                ancho="280px"
                margen="35px"
              />
            </PropAndInput>
            { errors.pages && <ErrorsForm>{errors.pages}</ErrorsForm>}
          </PropAndInputAndError>
          {/* ----------------------------------------------------------------------*/}
          <PropAndInputAndError name="rating">
            <PropAndInput>
              <H3Form>Rating</H3Form>
              <FormInput
                type="number"
                value={input.averageRating}
                min={1}
                max={5}
                name="averageRating"
                onChange={(e) => handleChange(e)}
                ancho="280px"
                margen="20px"
              />
            </PropAndInput>
            { errors.averageRating && <ErrorsForm>{errors.averageRating}</ErrorsForm> }
          </PropAndInputAndError>
          </PropAndInput>
          {/* -----------------------------------------------------------------------*/}
        </InfoContainer>
      </ImageAndInfoContainer>
      <DescriptionContainer name="description">
        <PropAndInput>
          <H3Form margenIzq="0px">Description</H3Form>
          { errors.description && <ErrorsForm>{errors.description}</ErrorsForm> }
        </PropAndInput>
        <FormTextArea
          type="text"
          value={input.description}
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </DescriptionContainer>
      { reviews && <BookReviews/> }
      <PropAndInput name="buttons">
        <PropAndInput width="230px">
          <ButtonForm type="button" onClick={(e) => close(e)} ancho="100px" color="red">
            Close Form
          </ButtonForm>
          <ButtonForm type="button" onClick={(e) => handleReset(e)} ancho="100px" color="red">
            Reset Fields
          </ButtonForm>
        </PropAndInput>
        { !newBook && <ButtonForm type="button" onClick={(e) => handleReviews(e)} ancho="120px">
            { reviews ? "Hide Reviews" : "Show Reviews" }
          </ButtonForm> }
        <PropAndInput width={newBook ? "100px" : "230px"}>
          <ButtonForm type="button" onClick={(e) => handleSubmit(e)} ancho="100px">
            { newBook ? "Create Book" : "Edit Book" }
          </ButtonForm>
          { !newBook && <ButtonForm type="button" onClick={(e) => handleDisable(e)} ancho="100px" color="red">
            { book.active ? "Disable Book" : "Activate Book"}
          </ButtonForm> }
        </PropAndInput>
      </PropAndInput>
    </FormContainer>
  );
};
 