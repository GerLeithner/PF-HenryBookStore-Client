import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";

import {
  cleanBookDetail,
  deleteReview,
  getBookById,
  getCurrentUser,
  turnOffModal,
} from "../redux/actions";

import {
  OverLay,
  Info,
  ButtonDetail,
  StarDetail,
  ButtonIcons,
  Cover,
  Description,
  Props,
  H1,
  H2,
  H3,
} from "../styles/Detail";

import {
  ReviewConteiner,
  Reviews,
} from "../styles/Review";

import "./CardMenu.css";

import starFill from "../icons/starFill.svg";
import starEmpty from "../icons/starEmpty.svg";
import readIcon from "../icons/readIcon.svg";
import check from "../icons/check.svg";
import plus from "../icons/plus.svg";
import { StarsContainer } from "../styles/CardRecommended";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function CardDetail({ book }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const modal = useSelector((state) => state.modal);

  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);
  const [newReview, setNewReview] = useState(false);

  const userId = { userId: currentUser && currentUser.id };

  useEffect(() => {
    if (currentUser && modal) {
      let allFavorites = [];
      let allReading = [];
      let allReaded = [];

      for (let i = 0; i < currentUser.Read.length; i++) {
        let read = currentUser.Read[i].id;
        allReaded.push(read);
      }
      for (let i = 0; i < currentUser.Reading.length; i++) {
        let reading = currentUser.Reading[i].id;
        allReading.push(reading);
      }
      for (let i = 0; i < currentUser.Favorites.length; i++) {
        let fav = currentUser.Favorites[i].id;

        allFavorites.push(fav);
      }
      setArrayFavorite(allFavorites);
      setArrayReading(allReading);
      setArrayReaded(allReaded);
    }
    return;
  }, [dispatch, currentUser, book]);

  useEffect(() => {
    if (arrayFavorite.includes(book.id)) {
      setFavorite(true);
    } else if (!arrayFavorite.includes(book.id)) {
      setFavorite(false);
    }
  }, [dispatch, arrayFavorite, book.id]);

  useEffect(() => {
    if (arrayReaded.includes(book.id)) {
      setReaded(true);
    } else if (!arrayReaded.includes(book.id)) {
      setReaded(false);
    }
  }, [dispatch, arrayReaded, book.id]);

  useEffect(() => {
    if (arrayReading.includes(book.id)) {
      setReading(true);
    } else if (!arrayReading.includes(book.id)) {
      setReading(false);
    }
  }, [dispatch, arrayReading, book.id]);

  if (currentUser) {
    console.log("Reviews del currentUser: " + currentUser.reviews.length);
  }

  function handleCloseClick(e) {
    e.preventDefault(e);
    dispatch(turnOffModal());
    setNewReview(false);
    dispatch(cleanBookDetail(e.target.value));
  }

  function handleReviewClick(e) {
    e.preventDefault(e);
    setNewReview(true);
    console.log("newReview", newReview);
    console.log("e.target.value", e.target.value);
  }

  function starRating(rating) {
    let ratingFloor = Math.floor(rating);

    let stars = [];
    for (let i = 0; i < ratingFloor; i++) {
      stars.push("star");
    }
    let mod = rating % ratingFloor;

    if (mod > 0) {
      stars.push("half");
    }
    return stars;
  }

  function handleDeleteReview(e) {
    e.preventDefault();
    console.log("e: ", e.target);
    dispatch(deleteReview(book.id, e.target.value));

    setTimeout(() => {
      dispatch(getBookById(book.id));
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

  var starAverage =
    book && book.averageRating && starRating(book.averageRating);

  return (
    modal && (
      <OverLay>
        <Info>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "40px",
              margin: 0,
              padding: 0,
            }}
          >
            <H1>{book.title}</H1>
            <Props>
              <StarsContainer>
                {starAverage &&
                  starAverage.map((s, i) =>
                    s === "star" ? (
                      <StarDetail key={i} src={starFill} alt="n" />
                    ) : (
                      <StarDetail key={i} src={starEmpty} alt="n" />
                    )
                  )}
              </StarsContainer>
              <H3>Published on {book.publishedDate}</H3>
              <H3>{book.pages} Pages</H3>
            </Props>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              margin: 0,
              padding: 0
            }}
          >
            <H2 style={{fontStyle: "italic"}}>{book.author?.name}</H2>
            <H3>{book.publisher}</H3>
          </div>
          <Description>{book.description}</Description>
          <div
            name="buttons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 0,
              padding: "0px 70px 0px 70px"
            }}
          >
          <ButtonDetail colorFondo={"#622CD4"} colorHover={"#7637FD"}>
            <div style={{
                display:"flex", alignItems: "center", gap: "10px"
              }}>
              <ButtonIcons src={readIcon} alt="n" />
              Read
            </div>
          </ButtonDetail>
          <ButtonDetail>
            <div style={{
                display:"flex", alignItems: "center", gap: "10px"
              }}>
              <ButtonIcons src={plus} alt="n" />
              My List
            </div>
          </ButtonDetail>
          <ButtonDetail>
          <div style={{
                display:"flex", alignItems: "center", gap: "10px"
              }}>
              <ButtonIcons src={check} alt="n" />
              Finished
            </div>
          </ButtonDetail>
          </div>
        </Info>
        <Cover src={book.cover} />
        <ReviewConteiner>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <H2>Users Reviews</H2>
            <div
              onClick={(e) => handleCloseClick(e)}
              style={{ cursor: "pointer" }}
            >
              x
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Reviews>
              {book.reviews &&
                book.reviews.map((r) => {
                  return (
                    <div>
                      <Review r={r} user={currentUser} bookId={book.id} />
                      {r.userId === currentUser.id && (
                        <button value={r.id} onClick={handleDeleteReview}>
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
            </Reviews>
          </div>
          {currentUser && currentUser.subscription ? (
            !currentUser.reviews.find((review) => {
              return review.bookId === book.id;
            }) ? (
              !newReview ? (
                <ButtonDetail
                  onClick={(e) => {
                    handleReviewClick(e);
                  }}
                >
                  Leave a Review
                </ButtonDetail>
              ) : (
                <CreateReview
                  currentUser={currentUser}
                  book={book}
                  setNewReview={setNewReview}
                  newReview={newReview}
                />
              )
            ) : (
              <div>Already reviewed</div>
            )
          ) : (
            <div>Subscribe to review</div>
          )}
        </ReviewConteiner>
      </OverLay>
    )
  );
}