import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  getAuthors,
  getGenres,
  sortBooksByPublishedDate,
  sortBooksByTitle,
  filterBooksByStatus,
  filterBooksByGenre
} from "../redux/actions";

import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";
import SortOrFilter from "./SortOrFilter.jsx";

import { SideButton } from "../styles/SortOrFilter";
import { BooksContainer } from "../styles/BooksTable"
import { ContainerCards } from "../styles/Card";
import { SelectFilters, SideBarContainer } from "../styles/Catalogue";
import { H3Form } from "../styles/CreateBook";


const Catalogue = () => {
  const dispatch = useDispatch();

  const allBooks = useSelector((state) => state.books);
  const allGenres = useSelector((state) => state.genres);
  const currentUser = useSelector((state) => state.currentUser);

  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const [header, setHeader] = useState("ALL BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20);
  const [, setSort] = useState({ name: "", option: ""});
  const [, setFilter] = useState({ name: "", option: ""});
  const [modal, setModal] = useState(false);  


  let indexOfLastBook = currentPage * booksPerPage;
  let indexOfFirstBook = indexOfLastBook - booksPerPage;
  let currentBook = allBooks.slice(indexOfFirstBook, indexOfLastBook);
  let countPages2 = Math.ceil(allBooks.length / booksPerPage);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };


  useEffect(() => {
    dispatch(getGenres());

    dispatch(getAuthors());

    dispatch(getBooks());
  }, [dispatch]);

  // carga los favs
  useEffect(()=>{
    if(currentUser){
      const userFavorites = currentUser.Favorites
 
      // console.log("USER FAVORITES",userFavorites)
  
    let allFavorites=[]
   
  
    for (let i=0; i<currentUser.Favorites.length; i++){
     let fav= currentUser.Favorites[i].id
     allFavorites.push(fav)
    }
    setArrayFavorite(allFavorites)
    }
   },[ dispatch,currentUser])

   // carga los readed
   useEffect(()=>{
    if(currentUser){
      
    const userReaded =currentUser.Read

    let allReaded=[]
 
    for (let i=0; i<currentUser.Read.length; i++){
     let read= currentUser.Read[i].id
     allReaded.push(read)
    }
    setArrayReaded(allReaded)
    }
   },[ dispatch,currentUser])

   // carga los reading
   useEffect(()=>{
    if(currentUser){
    const userReading = currentUser.Reading
    let allReading=[]
  
    for (let i=0; i<currentUser.Reading.length; i++){
     let reading= currentUser.Reading[i].id
     allReading.push(reading)
    }
    setArrayReading(allReading)
    }
   },[ dispatch,currentUser])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBooks());
  }

  function handleSort(e) {
    e.preventDefault();

    if(e.target.name === "Sort By Title") {
      dispatch(sortBooksByTitle(e.target.innerText));
    }
    if(e.target.name === "Sort By Year") {
      dispatch(sortBooksByPublishedDate(e.target.innerText));
    }
    setSort({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();

    if(e.target.name === "Filter By Genre") {
      dispatch(filterBooksByGenre(e.target.innerText));
    }
    if(e.target.name === "Filter By Status") {
      dispatch(filterBooksByStatus(e.target.innerText));
    }
    setFilter({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <SideBarContainer>
        <SideButton onClick={(e) => handleClick(e)} ancho={"170px"}>
          RELOAD BOOKS
        </SideButton>
        <SearchBar paginado={paginado} modal={modal} setModal={setModal} />
        <SelectFilters>
          <SortOrFilter 
            name="Sort By Title" 
            options={["Ascending", "Descending"]} 
            onButton={handleSort}
          />
          <SortOrFilter 
            name="Sort By Year" 
            options={["Oldest", "Newest"]} 
            onButton={handleSort}
          />
          {/* <Sort By Popularity 
            name="Filter By Size" 
            options={["More Populars", "Less Populars"]} 
          /> */}
          {/* <SortOrFilter 
            name="Filter By Size" 
            options={["Large", "Medium", "Short"]} 
          /> */}
          <SortOrFilter 
            name="Filter By Genre" 
            options={allGenres.map(g => g.name)}
            onButton={handleFilter} 
          />
          <SortOrFilter 
            name="Filter By Status" 
            options={["active", "disabled"]}
            onButton={handleFilter} 
          />
        </SelectFilters>
      </SideBarContainer>
      { currentUser ? 
        <BooksContainer>
          <div>
            <Paged
              booksPerPage={booksPerPage}
              allBooks={allBooks.length}
              paginado={paginado}
              currentPage={currentPage}
            />
          <div/>
          </div>
          <ContainerCards>
            {currentBook?.map((b) => {
              return (
                <div key={b.id}>
                  <Card
                    id={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                    modal={modal}
                    setModal={setModal}
                    arrayFavorite={arrayFavorite}
                    arrayReaded={arrayReaded}
                    arrayReading={arrayReading}
                  />
                </div>
              );
            })}
          </ContainerCards>
        </BooksContainer> 
        :
        <BooksContainer>
          <div style={{paddingTop: "200px", paddingLeft: "180px"}}>
            <H3Form>LOADING...</H3Form>
          </div>
          <ContainerCards>
            {currentBook?.map((b) => {
              return (
                <div key={b.id}>
                  <Card
                    id={b.id}
                    title={b.title}
                    publishedDate={b.publishedDate}
                    description={b.description}
                    averageRating={b.averageRating}
                    cover={b.cover}
                    genres={b.genres}
                    authors={b.authors}
                    modal={modal}
                    setModal={setModal}
                    arrayFavorite={arrayFavorite}
                    arrayReaded={arrayReaded}
                    arrayReading={arrayReading}
                    key={b.id}
                  />
                </div>
              );
            })}
          </ContainerCards>
        </BooksContainer>
      }  
    </div>
  );
};

export default Catalogue;
