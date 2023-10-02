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
  //const [title, setTitle] = useState("");
  const allBooks = useSelector((state) => state.allBooks);
  const inputRef = useRef(null);
  const history = useHistory();
  // const [author,setAuthor]=useState('')
  useEffect(() => {
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
  const allGenres = useSelector((state) => state.genres);
  const allAuthors = useSelector((state) => state.authors);

  function handleInputChange(e) {
    e.preventDefault();

    if (e.target.value !== "") {
      dispatch(searchInput(e.target.value));
      dispatch(getBookByTitle(e.target.value));
      history.push("/search");
    } else {
      history.goBack();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInputFocus((prevInputFocus) => !prevInputFocus);
    dispatch(searchInput(""));
  }
  function handleClick(e) {
    e.preventDefault(e);
    setModal(true);
    let id = allBooks.find((book) => book.title === e.target.textContent).id;
    dispatch(getBookById(id));
  }
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
