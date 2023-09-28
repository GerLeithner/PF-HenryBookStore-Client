import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  deleteReview,
  getBookById,
  getCurrentUser,
  editState
} from "../redux/actions";

import {
  DetailReview,
  ReviewContent,
  ReviewInfo,
  EditMenu,
  DropDownEdit,
} from "../styles/Review";
import { ReactComponent as DotsIcon } from "../icons/dotsIcon.svg";
import { ReactComponent as EditIcon } from "../icons/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../icons/deleteIcon.svg";

export default function Review({ r }) {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (currentUser?.id === r?.userId && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleDeleteReview(e) {
    e.preventDefault();

    dispatch(deleteReview(r.bookId, r.id));

    setTimeout(() => {
      dispatch(getBookById(r.bookId));
    }, 300);
    setTimeout(() => {
      const { email, nickname } = currentUser;
      const userDb = {
        email,
        nickname,
      };
      dispatch(getCurrentUser(userDb));
    }, 300);

    toast.success("Review Deleted Succesfully");
  }

  function handleEditReview(e) {
    e.preventDefault();
    dispatch(editState(true)); // va a tener que ser global porque no está cambiando el edit del detail
  }

  return (
    <DetailReview>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "cen",
        }}
      >
        <ReviewInfo>{r?.user?.userName}</ReviewInfo>
        <div
          style={{
            border: "solid #D9D9D9 1px",
            borderRadius: "5px",
            height: "26px",
            width: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReviewInfo>{r?.score},0</ReviewInfo>
        </div>
      </div>
      <ReviewContent>{r?.comment ? r.comment : ""}</ReviewContent>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ReviewInfo fontSize={"medium"} textColor={"#D9D9D9"}>
          {r?.create_date}
        </ReviewInfo>
        { currentUser?.id === r?.userId &&
          <EditMenu ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className={openMenu ? "active" : "inactive"}
            >
              <DotsIcon />
            </button>
            <DropDownEdit className={openMenu ? "active" : "inactive"}>
              <button onClick={e => handleEditReview(e)}>
                <EditIcon/>
                Edit
              </button>
              <button onClick={e => handleDeleteReview(e)}>
                <DeleteIcon />
                Delete
              </button>
            </DropDownEdit>
          </EditMenu>
        }
      </div>
    </DetailReview>
  );
}
