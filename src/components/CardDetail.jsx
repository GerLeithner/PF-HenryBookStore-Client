import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import styled from "styled-components";

import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";

import {
  cleanBookDetail,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
  getCurrentUser,
} from "../redux/actions";

import {
  CardImgDetail,
  ImgContainerDetail,
  SingleCardContainerDetail,
  DescriptionCardConteinerDetail,
  H1Detail,
  H2Detail,
  ColumnConteinerDetail,
  DescriptionPDetail,
  SubtitleAndYear,
  TitleAndRating,
  OverLay,
  ButtonCloseDetail,
  H5Detail,
  ReviewConteiner,
  H4Detail,
  ButtonDetail,
  ImgAndInfo,
  ButtonOptionsDetail,
  ButtonSelectDetail,
  UserAndStars,
  ButtonsConteiner,
  StarDetail,
} from "../styles/Detail";

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

import {
  UlCard,
  MenuConteiner,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";
import "./CardMenu.css";

import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import starFill from "../icons/starFill.svg";
import starHalf from "../icons/starHalf.svg";
import closeIcon from "../icons/closeIcon.svg";
import bookIcon from "../icons/bookIcon.svg";
import bookHalfIcon from "../icons/bookHalfIcon.svg";
import { StarsContainer } from "../styles/CardRecomended";
import BookReviews from "../components/BookReviews.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DropdownItem(props) {
  return (
    <li>
      <img
        src={props.icon}
        alt="n"
        role="button"
        onClick={props.handle}
        value={props.id}
      />
    </li>
  );
}

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
  const [isHovering, setIsHovering] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const userId = { userId: currentUser && currentUser.id };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      console.log("Entré a add favorite, bookId:", id);
      setFavorite(true);
      console.log("FAV+", favorite);
      dispatch(addFavorite(id, userId));
      toast.success("Book added to your favorites");
    }

    if (favorite) {
      console.log("Entré a delete favorite, bookId:", id);
      setFavorite(false);
      console.log("FAV-", favorite);

      dispatch(deleteFavorite(id, userId));

      toast.warning("Book removed from your favorites");
    }
  }

  function handleReaded(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      console.log("Entré a add readed :", id);
      setReaded(true);
      console.log("READ+", readed);

      dispatch(addReaded(id, userId));
      toast.success("Book mark as readed");
    }

    if (readed) {
      console.log("Entré a delete readed :", id);
      setReaded(false);
      console.log("READ-", readed);

      dispatch(deleteReaded(id, userId));
      toast.warning("Book mark as unread");
    }
  }

  function handleReading(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!reading) {
      console.log("Entré a add reading :", id);
      setReading(true);
      console.log("READ+", reading);

      dispatch(addReading(id, userId));

      toast.success("Book mark as reading");
    }

    if (reading) {
      console.log("Entré a delete reading :", id);
      setReading(false);
      console.log("READ-", reading);

      dispatch(deleteReading(id, userId));
      toast.warning("Book mark as unreading");
    }
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

  function handleReading(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!reading) {
      console.log("Entré a add reading :", id);
      setReading(!reading);
      console.log("READ+", reading);

      dispatch(addReading(id, userId));
    }
    if (reading) {
      console.log("Entré a delete reading :", id);
      setReading(!reading);
      console.log("READ-", reading);
      dispatch(deleteReading(id, userId));
    }
  }

  var starAverage =
    book && book.averageRating && starRating(book.averageRating);

  var review1Star =
    book &&
    book.reviews &&
    book.reviews[0] &&
    starRating(book.reviews[0].score);

  var review2Star =
    book &&
    book.reviews &&
    book.reviews[1] &&
    starRating(book.reviews[1].score);

  useEffect(() => {
    if (currentUser && modal) {
      const userReaded = currentUser.Read;
      const userReading = currentUser.Reading;
      const userFavorites = currentUser.Favorites;
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
              <div>Subscribe to review</div>
            )}
          </ReviesContainer>
        </div>
      </OverLay>
    )
  );
}
