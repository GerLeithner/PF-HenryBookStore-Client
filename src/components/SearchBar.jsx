import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookById, getBookByTitle } from "../redux/actions";
import { ButtonCatalogue } from "../styles/Catalogue";
import { getAuthors, getBooks, getGenres, searchInput } from "../redux/actions";
import searchLogo from "../icons/search.svg";
import { useHistory } from "react-router-dom";
import {
  DropdownSearch,
  InputSearch,
  RowSearchBar,
  SearchContainer,
  InputAndButton,
  ButtonContainer,
} from "../styles/SearchBar";

const SearchBar = ({ modal, setModal }) => {
  const dispatch = useDispatch();

  const [inputFocus, setInputFocus] = useState(false);
  const search = useSelector((state) => state.search);
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);
  //const [title, setTitle] = useState("");
  const allBooks = useSelector((state) => state.allBooks);
  const inputRef = useRef(null);
  const history = useHistory();
  // const [author,setAuthor]=useState('')
  useEffect(() => {
    if (search === "") {
      history.push("/home");
    }
    if (!allGenres.length) {
      dispatch(getGenres());
    }
    if (!allAuthors.length) {
      dispatch(getAuthors());
    }
    if (!allBooks.length) {
      dispatch(getBooks());
    }
  }, [dispatch]);

  function handleInputChange(e) {
    e.preventDefault();

    dispatch(searchInput(e.target.value));
    dispatch(getBookByTitle(e.target.value));
    if (e.target.value !== "") {
      if (window.location.pathname !== "/search") {
        history.push("/search");
      }
    } else {
      history.goBack();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInputFocus((prevInputFocus) => !prevInputFocus);
  }

  useEffect(() => {
    let input = (e) => {
      if (!inputRef.current.contains(e.target)) {
        setInputFocus(false);
      }
    };

    document.addEventListener("mousedown", input);

    return () => document.removeEventListener("mousedown", input);
  }, []);
  return (
    <SearchContainer>
      <InputAndButton ref={inputRef}>
        <InputSearch
          className={inputFocus ? "active" : "inactive"}
          placeholder="Search by title or author..."
          type="search"
          value={search}
          onChange={(e) => handleInputChange(e)}
          results={1}
        />
        <ButtonContainer
          type="submit"
          onClick={(e) => handleSubmit(e)}
        ></ButtonContainer>
      </InputAndButton>

      {/*       <div>
        <DropdownSearch>
          {allBooks
            .filter((book) => {
              const searchTerm = search.toLowerCase();
              const titleOfBookSearched = book.title.toLowerCase();

              const nameOfAuthorSearched = book.author.name.toLowerCase();

              return (
                searchTerm &&
                (titleOfBookSearched.includes(searchTerm) ||
                  nameOfAuthorSearched.includes(searchTerm)) &&
                titleOfBookSearched !== searchTerm
              );
            })
            .slice(0, 10)
            .map((book, i) => (
              <RowSearchBar
                onClick={(e) => handleClick(e)}
                modal={modal}
                setModal={setModal}
                key={i}
              >
                {book.title}
              </RowSearchBar>
            ))}
        </DropdownSearch>
      </div> */}
    </SearchContainer>
  );
};

export default SearchBar;
