import React, { useState, useEffect, useRef } from "react";
import { SelectFilters, SideBarContainer } from "../styles/Catalogue";
import { SideButton } from "../styles/SortOrFilter";
import SortOrFilter from "./SortOrFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanSortedBooks,
  filterBy,
  getBooks,
  sortBooksByPublishedDate,
  sortBooksByTitle,
} from "../redux/actions";

export function Filters() {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);
  const currentUser = useSelector((state) => state.currentUser);

  const [header, setHeader] = useState("ALL BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSort] = useState({ name: "", option: "" });
  const [filters, setFilters] = useState([]);
  const [subscribe, setSubscribe] = useState(true);

  function handleReload(e) {
    e.preventDefault();

    dispatch(getBooks());
    setFilters([]);
  }

  function handleSort(e) {
    e.preventDefault();

    if (e.target.name === "Sort By Title") {
      dispatch(sortBooksByTitle(e.target.innerText));
    }
    if (e.target.name === "Sort By Year") {
      dispatch(sortBooksByPublishedDate(e.target.innerText));
    }
    setSort({ name: e.target.name, option: e.target.innerText });
    setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    setCurrentPage(1);
  }

  async function handleFilter(e) {
    e.preventDefault();

    let includesGenre = false;
    let includesLength = false;

    if (!filters.length) {
      if (e.target.name === "Filter By Genre") {
        dispatch(filterBy(["Genre-" + e.target.innerText]));
        setFilters([...filters, "Genre-" + e.target.innerText]);
      }
      if (e.target.name === "Filter By Length") {
        console.log(e.target.innerText);
        dispatch(filterBy(["Length-" + e.target.innerText]));
        setFilters([...filters, "Length-" + e.target.innerText]);
      }
    } else {
      if (e.target.name === "Filter By Genre") {
        filters.forEach((filter) => {
          if (filter.includes("Genre-")) includesGenre = true;
        });
        if (!includesGenre) {
          dispatch(filterBy([...filters, "Genre-" + e.target.innerText]));
          setFilters([...filters, "Genre-" + e.target.innerText]);
        }
      }

      if (e.target.name === "Filter By Length") {
        filters.forEach((filter) => {
          if (filter.includes("Length-")) includesLength = true;
        });
        if (!includesLength) {
          dispatch(filterBy([...filters, "Length-" + e.target.innerText]));
          setFilters([...filters, "Length-" + e.target.innerText]);
        }
      }
    }

    dispatch(filterBy(filters));

    setCurrentPage(1);
  }

  function handleDeleteFilter(e) {
    e.preventDefault();

    let deletedFilter = e.target.textContent.substring(
      0,
      e.target.textContent.indexOf("X") - 1
    );

    let currentFilters = filters.filter((f) => f !== deletedFilter);

    dispatch(cleanSortedBooks());

    dispatch(filterBy(currentFilters));

    setFilters(filters.filter((f) => f !== deletedFilter));
  }

  return (
    <SideBarContainer
      paddingTop={
        subscribe && currentUser && !currentUser.subscription ? "115px" : "65px"
      }
    >
      <SideButton onClick={(e) => handleReload(e)} ancho={"170px"}>
        CLEAR FILTERS
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

        {
          <SortOrFilter
            name="Filter By Length"
            options={["Large", "Medium", "Short"]}
            onButton={(e) => handleFilter(e)}
          />
        }
        <SortOrFilter
          name="Filter By Genre"
          options={allGenres.map((g) => g.name)}
          onButton={(e) => handleFilter(e)}
        />
      </SelectFilters>

      <div>
        {filters.length ? (
          filters.map((f) => (
            <div
              onClick={(e) => handleDeleteFilter(e)}
              key={f}
              id={f}
              title={f}
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
            >
              <p>{f} X </p>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </SideBarContainer>
  );
}
