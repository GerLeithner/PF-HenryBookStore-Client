import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";

import { cleanBookDetail } from "../redux/actions";

import { OverLay, ButtonDetail, StarDetail } from "../styles/Detail";

import {
  DetailReview,
  Description,
  DetailContainer,
  ReviesContainer,
  CoverAndInfo,
  Cover,
  Info,
  Props,
  H1,
  H2,
  Reviews,
} from "../styles/Review";

import "./CardMenu.css";

import starFill from "../icons/starFill.svg";
import starHalf from "../icons/starHalf.svg";
import { StarsContainer } from "../styles/CardRecomended";
import "react-toastify/dist/ReactToastify.css";

export default function CardDetail({ book, modal, setModal }) {
  const dispatch = useDispatch();

  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);
  const [newReview, setNewReview] = useState(false);

  const userId = { userId: currentUser && currentUser.id };

  useEffect(() => {}, [book.reviews]);

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
    setModal(false);
    setNewReview(false);
    console.log("MODAL", modal);
    console.log("e.target.value", e.target.value);
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

  var starAverage =
    book && book.averageRating && starRating(book.averageRating);

  return (
    modal && (
      <OverLay>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <DetailContainer>
            <CoverAndInfo>
              <Cover src={book.cover} />
              <Info>
                <Props>
                  <H1>{book.title}</H1>
                  <Props>
                    <StarsContainer>
                      {starAverage &&
                        starAverage.map((s, i) =>
                          s === "star" ? (
                            <StarDetail key={i} src={starFill} alt="n" />
                          ) : (
                            <StarDetail key={i} src={starHalf} alt="n" />
                          )
                        )}
                    </StarsContainer>
                  </Props>
                </Props>
                <Props>
                  <H2>Author: {book.author?.name}</H2>
                  <H2>Published: {book.publishedDate}</H2>
                </Props>
                <Props>
                  <H2>Genre: {book.genre?.name}</H2>
                  <H2>{book.pages} Pages</H2>
                </Props>
                <Props>
                  <H2>Publisher: {book.publisher}</H2>
                </Props>
              </Info>
            </CoverAndInfo>
            <Description>{book.description}</Description>
          </DetailContainer>
          <ReviesContainer>
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
                    return <Review r={r} />;
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
                    modal={modal}
                    setModal={setModal}
                  />
                )
              ) : (
                <div>Already reviewed</div>
              )
            ) : (
              <div>Subscribe to review</div>
            )}
          </ReviesContainer>
        </div>
      </OverLay>
    )
  );
}
