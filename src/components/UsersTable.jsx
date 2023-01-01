import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/actions";

import EditUser from "./EditUser";
import TablePaged from "./TablePaged";
import SortOrFilter from "./SortOrFilter";

import { SideButton } from "../styles/SortOrFilter";
import { SelectFilters, SideBarContainer } from "../styles/Catalogue";
import { BooksContainer, Table } from "../styles/BooksTable";
import { PagedButton } from "../styles/Paged";
import { H3Form } from "../styles/CreateBook";


export default function Catalogue() {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.users);

  const [, setSort] = useState({ name: "", option: ""});
  const [, setFilter] = useState({ name: "", option: ""});
  const [header, setHeader] = useState("ALL USERS");

  const [modal, setModal] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [usersXPage, ] = useState(20);

  let indexOfLastBook = currentPage * usersXPage;
  let indexOfFirstBook = indexOfLastBook - usersXPage;
  let currentBook = allUsers.slice(indexOfFirstBook, indexOfLastBook);
  let countPages2 = Math.ceil(allUsers.length / usersXPage);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, modal]);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages2) setCurrentPage(pageNumber);
  };

  function handleReload(e) {
    e.preventDefault();
    dispatch(getBooks());
    setModal(false);
    setCurrentPage(1);
    setHeader("ALL BOOKS");
    window.scrollTo(0, 0);
  }

  function handleSort(e) {
    e.preventDefault();

    if(e.target.name === "Sort By Title") {
      dispatch(sortByTitle(e.target.innerText));
    }
    if(e.target.name === "Sort By Year") {
      dispatch(sortByPublisherDate(e.target.innerText));
    }
    setSort({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();

    if(e.target.name === "Filter By Genre") {
      dispatch(filterByGenre(e.target.innerText));
    }
    if(e.target.name === "Filter By Status") {
      dispatch(filterByStatus(e.target.innerText));
    }
    setFilter({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  function handleCreateBook(e) {
    e.preventDefault();

    dispatch(cleanDetail());
    setNewBook(true);
    if(!modal) setModal(true);
    window.scrollTo(0, 0);
  }

  function handleEditBook(e) {
    e.preventDefault();

    setNewBook(false);
    dispatch(getBookById(e.target.value))
    setModal(true);
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <SideBarContainer>
        <SideButton onClick={(e) => handleReload(e)} ancho="163px">
          RELOAD USERS
        </SideButton>
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
      <BooksContainer>
        { modal && 
        <>
          <H3Form margenIzq="0px">{newBook ? "NEW BOOK" : "EDIT BOOK"}</H3Form>
          <EditUser> 
            setModal={setModal} 
            newBook={newBook} 
            setNewBook={setNewBook}
          </EditUser>
        </>
        }
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "60%"}}>
          <H3Form margenIzq="0px">
            {header}
          </H3Form>
          <TablePaged
            usersXPage={usersXPage}
            allUsers={allUsers.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
        <Table>
          <thead style={{backgroundColor: "#ccc", height: "30px"}}>
            <tr style={{height: "40px"}}>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Publisher</th>
              <th>Genre</th>
              <th>Identifier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { currentBook?.map(book => {
              return(
                <tr key={book.id} style={{height: "40px"}}>
                  <td>
                    <PagedButton value={book.id} onClick={(e) => handleEditBook(e)}>
                      {book.title}
                    </PagedButton>
                  </td>
                  <td>{book.author.name}</td>
                  <td>{book.publishedDate}</td>
                  <td>{book.publisher}</td>
                  <td>{book.genre.name}</td>
                  <td>{book.identifier}</td>
                  <td>{book.active ? "active" : "disabled"}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </BooksContainer>
    </div>
  );
};