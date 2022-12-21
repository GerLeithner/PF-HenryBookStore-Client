import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook, getAuthors, getGenres } from "../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";
import { DropdownSearch, RowSearchBar } from "../styles/SearchBar";
import { 
  FormInput, 
  ErrorsForm,
  Container,
  FormContainer, 
  ImageAndInfoContainer,
  BookImage,
  InfoContainer,
  PropAndInput
  } from "../styles/CreateBook";


function validate(input) {
  const imgVal =
    /(https?:\/\/)?([\w])+\.{1}([a-zA-Z]{2,63})([\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
  const regName = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regNum = new RegExp("^[0-9]+$");
  let errors = {};

  if (!input.cover || !imgVal.test(input.cover)) {
    errors.cover = "Insert a valid link";
  }
  if (!input.title) errors.title = "Title is required";
  else if (!regName.test(input.title)) errors.title = "Enter a valid title";
  if (!input.authorName) errors.authorName = "Author is required";
  else if (!regName.test(input.authorName))
    errors.authorName = "Enter a valid author";
  if (!input.pages) errors.pages = "The number of pages is required";
  else if (input.pages > 20000 || input.pages < 1 || !regNum.test(input.pages))
    errors.pages = "Pages must be a number betwen 1 and 20000";
  if (input.publishedDate < 0 || input.publishedDate > 2023)
    errors.publishedDate = "Published Date must be a number between 0 and 2030";
  if (input.averageRating < 1 || input.averageRating > 5)
    errors.averageRating = "Average Rating must be a number between 1 and 5";
  return errors;
}

export default function CreateBook() {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const genres = useSelector((state) => state.genres);
  const authors = useSelector((state) => state.authors);
  
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
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

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAuthors());
  }, [dispatch]);

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

  function handleAuthor(e) {
    console.log("e.target.value", e.target.value);
    console.log("e", e);
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
    console.log("e.target.value", e.target.value);
    console.log("e", e);
    if (e.target.value) {
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
    console.log("errorsLength", errorsLength);
    if (errorsLength > 0) {
      console.log("ErrorsSubmit", errors);
      alert("One or more fields have errors, please check them");
    } else {
      console.log("ErrorsSubmit", errors);
      dispatch(createBook(input));
      alert("The Book has been created");
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
      history.push("/home");
    }
  }

  let genresDrop = genres.filter((genre) => {
    console.log(input.genreName);
    const searchTerm = input.genreName.toLowerCase();
    const nameOfGenre = genre.name.toLowerCase();

    return (
      searchTerm &&
      nameOfGenre.includes(searchTerm) &&
      nameOfGenre !== searchTerm
    );
  }).slice(0, 10).map((genre, i) => (
      <RowSearchBar
        name="genreName"
        onClick={(e) => handleGenre(e)}
        key={i}
        value={input.authorName}
      >
        {genre.name}
      </RowSearchBar>
  ));

  let dropAllGenres = genres.slice(0, 10).map((genre, i) => (
    <RowSearchBar
      name="genreName"
      onClick={(e) => handleGenre(e)}
      key={i}
      value={input.authorName}
    >
      {genre.name}
    </RowSearchBar>
  ));

  return (
    // <Container>
    //   <FormContainer>
    //     <div>
    //       <div>
    //         <div>
    //           <div>
    //             <FormInput
    //               type="text"
    //               value={input.title}
    //               name="title"
    //               placeholder="Insert Title"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             {errors.title && <ErrorsForm>{errors.title}</ErrorsForm>}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="text"
    //               value={input.authorName}
    //               placeholder="Insert Author"
    //               name="authorName"
    //               onChange={(e) => handleAuthor(e)}
    //               autoComplete="off"
    //             />
    //             <DropdownSearch>
    //               {authors
    //                 .filter((author) => {
    //                   console.log(input.authorName);
    //                   const searchTerm = input.authorName.toLowerCase();
    //                   const nameOfAuthor = author.name.toLowerCase();

    //                   return (
    //                     searchTerm &&
    //                     nameOfAuthor.includes(searchTerm) &&
    //                     nameOfAuthor !== searchTerm
    //                   );
    //                 })
    //                 .slice(0, 10)
    //                 .map((author, i) => (
    //                   <RowSearchBar
    //                     name="authorName"
    //                     onClick={(e) => handleAuthor(e)}
    //                     key={i}
    //                     value={input.authorName}
    //                   >
    //                     {author.name}
    //                   </RowSearchBar>
    //                 ))}
    //             </DropdownSearch>
    //             {errors.authorName && (
    //               <ErrorsForm>{errors.authorName}</ErrorsForm>
    //             )}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="text"
    //               value={input.description}
    //               name="description"
    //               placeholder="Insert Description"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             {errors.Description && (
    //               <ErrorsForm>{errors.description}</ErrorsForm>
    //             )}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="number"
    //               value={input.publishedDate}
    //               name="publishedDate"
    //               min={0}
    //               max={2023}
    //               placeholder="Insert publishedDate"
    //               onChange={handleChange}
    //             />
    //             {errors.publishedDate && (
    //               <ErrorsForm>{errors.publishedDate}</ErrorsForm>
    //             )}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="text"
    //               value={input.publisher}
    //               name="publisher"
    //               placeholder="Insert Publisher"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             {errors.publisher && (
    //               <ErrorsForm>{errors.publisher}</ErrorsForm>
    //             )}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="number"
    //               max={20000}
    //               min={1}
    //               value={input.pages}
    //               name="pages"
    //               placeholder="Insert Pages"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             {errors.pages && <ErrorsForm>{errors.pages}</ErrorsForm>}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="number"
    //               placeholder="Insert averageRating"
    //               value={input.averageRating}
    //               min={1}
    //               max={5}
    //               name="averageRating"
    //               onChange={(e) => handleChange(e)}
    //             />
    //             {errors.averageRating && (
    //               <ErrorsForm>{errors.averageRating}</ErrorsForm>
    //             )}
    //           </div>
    //           <div>
    //             <FormInput
    //               type="text"
    //               placeholder="Insert a link to a Cover image"
    //               value={input.cover}
    //               name="cover"
    //               onChange={(e) => handleChange(e)}
    //             />
    //           </div>
    //           {errors.cover ? (
    //             <div>
    //               <ErrorsForm>{errors.cover}</ErrorsForm>
    //               <img
    //                 src="https://www.comunidadbaratz.com/wp-content/uploads/Instrucciones-a-tener-en-cuenta-sobre-como-se-abre-un-libro-nuevo.jpg"
    //                 width={"100px"}
    //                 height={"100px"}
    //                 alt="BookCover"
    //               />
    //             </div>
    //           ) : (
    //             <div>
    //               <br />
    //               <br />
    //               <ul>
    //                 The chosen image is:
    //                 <li>
    //                   <img
    //                     src={input.cover}
    //                     alt="img not found"
    //                     width={"100px"}
    //                     height={"100px"}
    //                   />
    //                 </li>
    //               </ul>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <label>Select Genre:</label>
    //       <FormInput
    //         type="text"
    //         value={input.genreName}
    //         placeholder="Insert Genre"
    //         name="genreName"
    //         onChange={(e) => handleGenre(e)}
    //       />
    //       {genresDrop.length ? genresDrop : dropAllGenres}
    //     </div>
    //     <div>
    //       <ButtonCatalogue type="submit" onClick={(e) => handleSubmit(e)}>
    //         Add New Book
    //       </ButtonCatalogue>
    //     </div>
    //   </FormContainer>
    // </Container>

    <Container>
      <FormContainer>
        <ImageAndInfoContainer>
          <BookImage/>
          <InfoContainer>
            <PropAndInput>
              <div>Title</div>
              <div>input</div>
            </PropAndInput>
            <PropAndInput>
              <div>Subtitle</div>
              <div>input</div>
            </PropAndInput>
            <PropAndInput>
              <div>Author</div>
              <div>input</div>
            </PropAndInput>
            <PropAndInput>
              <div>Publisher</div>
              <div>input</div>
            </PropAndInput>
            <PropAndInput>
              <>Published Year</>
              <>input</>
            </PropAndInput>
          </InfoContainer>
        </ImageAndInfoContainer>
        <PropAndInput>
          <div>Cover</div>
          <div>input</div>
        </PropAndInput>
        <PropAndInput>
          <>Genre</>
          <>input</>
        </PropAndInput>
        <>Description</>
        <>Description TextArea</>
        <PropAndInput>
          <PropAndInput>
            <>boton reset</>
            <>boton save</>
          </PropAndInput>
          <>boton delete</>
        </PropAndInput>
      </FormContainer>
    </Container>
  );
};

