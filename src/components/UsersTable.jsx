import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById, cleanUserDetail } from "../redux/actions";

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

  const currentUser = useSelector((state) => state.currentUser);
  const [, setSort] = useState({ name: "", option: "" });
  const [, setFilter] = useState({ name: "", option: "" });
  const [header, setHeader] = useState("ALL USERS");

  const [modal, setModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersXPage] = useState(20);

  let indexLastUser = currentPage * usersXPage;
  let indexFirstUser = indexLastUser - usersXPage;
  let currentUsers = allUsers.slice(indexFirstUser, indexLastUser);
  let countPages = Math.ceil(allUsers.length / usersXPage);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, modal]);

  const paginado = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= countPages) setCurrentPage(pageNumber);
  };

  function handleReload(e) {
    e.preventDefault();
    dispatch(getAllUsers());
    setModal(false);
    setCurrentPage(1);
    setHeader("ALL BOOKS");
    window.scrollTo(0, 0);
  }

  function handleSort(e) {
    e.preventDefault();

    // if(e.target.name === "Sort By Title") {
    //   dispatch(sortBooksByTitle(e.target.innerText));
    // }
    // if(e.target.name === "Sort By Year") {
    //   dispatch(sortBooksByPublisherDate(e.target.innerText));
    // }
    // setSort({ name: e.target.name, option: e.target.innerText });
    // setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    // setCurrentPage(1);
  }

  function handleFilter(e) {
    e.preventDefault();

    // if(e.target.name === "Filter By Genre") {
    //   dispatch(filterBooksByGenre(e.target.innerText));
    // }
    // if(e.target.name === "Filter By Status") {
    //   dispatch(filterBooksByStatus(e.target.innerText));
    // }
    // setFilter({ name: e.target.name, option: e.target.innerText });
    // setHeader(`BOOKS - ${e.target.name} - ${e.target.innerText}`);
    // setCurrentPage(1);
  }

  function handleEditUser(e) {
    e.preventDefault();

    dispatch(getUserById(e.target.value));
    setModal(true);
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {currentUser ? (
        currentUser.admin ? (
          <div>
            <SideBarContainer>
              <SideButton onClick={(e) => handleReload(e)} ancho="163px">
                RELOAD USERS
              </SideButton>
              <SelectFilters>
                <SortOrFilter
                  name="Sort By Name"
                  options={["Ascending", "Descending"]}
                  onButton={handleSort}
                />
                <SortOrFilter
                  name="Filter By Status"
                  options={["active", "disabled"]}
                  onButton={handleFilter}
                />
                <SortOrFilter
                  name="Subscriptions"
                  options={["One Month", "Six Months", "A Year"]}
                  onButton={handleFilter}
                />
              </SelectFilters>
            </SideBarContainer>
            <BooksContainer>
              {modal && (
                <>
                  <H3Form margenIzq="0px">EDIT USERS</H3Form>
                  <EditUser setModal={setModal} />
                </>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "60%",
                }}
              >
                <H3Form margenIzq="0px">{header}</H3Form>
                <TablePaged
                  usersXPage={usersXPage}
                  allUsers={allUsers.length}
                  paginado={paginado}
                  currentPage={currentPage}
                />
              </div>
              <Table>
                <thead style={{ backgroundColor: "#ccc", height: "30px" }}>
                  <tr style={{ height: "40px" }}>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Subscription</th>
                    <th>Payment Mod</th>
                    <th>Act. Date</th>
                    <th>Exp. Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers?.map((user) => {
                    return (
                      <tr key={user.id} style={{ height: "40px" }}>
                        <td>
                          <PagedButton
                            value={user.id}
                            onClick={(e) => handleEditUser(e)}
                          >
                            {user.userName}
                          </PagedButton>
                        </td>
                        <td>{user.email}</td>
                        <td>1 month</td>
                        <td>mod 1</td>
                        <td>dd/mm/yyyy</td>
                        <td>dd/mm/yyyy</td>
                        <td>{user.active ? "active" : "disabled"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </BooksContainer>
          </div>
        ) : (
          <BooksContainer>
            <h1>404 Page not Found</h1>
          </BooksContainer>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
