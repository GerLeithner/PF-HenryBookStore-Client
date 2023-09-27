import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DetailReview,
  ReviewContent,
  ReviewInfo,
  EditButton,
  EditMenu,
  DropDownEdit,
} from "../styles/Review";
import { ReactComponent as DotsIcon } from "../icons/dotsIcon.svg";
import { ReactComponent as EditIcon } from "../icons/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../icons/deleteIcon.svg";

export default function Review({ r }) {

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
              <button>
                <EditIcon />
                Edit
              </button>
              <button>
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
