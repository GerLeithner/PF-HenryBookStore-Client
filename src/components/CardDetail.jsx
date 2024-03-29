import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import StarRating from "./StarRating.jsx";
import CreateReview from "./CreateReview.jsx";
import Review from "./Review.jsx";
import Reviews from "./Reviews.jsx";

import {
  addFavorite,
  addReaded,
  addReading,
  cleanBookDetail,
  deleteFavorite,
  deleteReaded,
  deleteReading,
  editState,
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

import { ReactComponent as FavoriteIcon } from "../icons/add-circle.svg";
import { ReactComponent as FinishedIcon } from "../icons/checkRead.svg";
import { ReactComponent as UnfinishedIcon } from "../icons/cross-circle2.svg";
import { ReactComponent as UnfavoriteIcon } from "../icons/minus-circle.svg";
import { ReactComponent as ReadingIcon } from "../icons/readIcon.svg";

import "./CardMenu.css";

import starFill from "../icons/starFill.svg";
import starEmpty from "../icons/starEmpty.svg";
import readIcon from "../icons/readIcon.svg";
import check from "../icons/check.svg";
import plus from "../icons/plus.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardIcon } from "../styles/Card.js";

export default function CardDetail({
  book,
  read,
  readChange,
  favorites,
  favoritesChange,
  readeds,
  readedsChange,
  catalogue,
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const modal = useSelector((state) => state.modal);

  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);

  const userId = { userId: currentUser && currentUser.id };

  //  useEffect( () => {
  //   return () => {
  //     dispatch(editState(false));
  //     dispatch(cleanBookDetail());
  //   }
  // }, []);
  // =======
  useEffect(() => {
    dispatch(editState(false));

    return () => {
      dispatch(turnOffModal());
      dispatch(cleanBookDetail());
    };
  }, []);

  useEffect(() => {
    //Veo si es favorito
    if (
      currentUser?.Favorites?.map((f) => {
        return f.id;
      }).includes(book.id)
    ) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }

    //Veo si fue Leído
    if (
      currentUser?.Read?.map((f) => {
        return f.id;
      }).includes(book.id)
    ) {
      setReaded(true);
    } else {
      setReaded(false);
    }

    //Veo si está siendo leído
    if (
      currentUser?.Reading?.map((f) => {
        return f.id;
      }).includes(book.id)
    ) {
      setReading(true);
    } else {
      setReading(false);
    }
  }, [dispatch, currentUser, book]);

  function handleFavorite(e) {
    e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      setFavorite(true);

      dispatch(addFavorite(book.id, userId));
      toast.success("Book added to your favorites");
    }

    if (favorite) {
      setFavorite(false);

      dispatch(deleteFavorite(book.id, userId));

      toast.warning("Book removed from your favorites");
    }

    if (favoritesChange) {
      setTimeout(() => favoritesChange(!favorites), 300);
    }
  }

  function handleReaded(e) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      setReaded(true);

      dispatch(addReaded(book.id, userId));
      toast.success("Book mark as readed");
    }

    if (readed) {
      setReaded(false);

      dispatch(deleteReaded(book.id, userId));
      toast.warning("Book mark as unread");
    }
    if (readedsChange) {
      setTimeout(() => readedsChange(!readeds), 300);
    }
  }

  function handleReading(e) {
    // console.log("e.target.value",e.target.value)
    e.preventDefault();

    if (!reading) {
      console.log("Entré a add reading :", book.id);
      setReading(true);
      console.log("READ+", reading);

      dispatch(addReading(book.id, userId));

      toast.success("Book mark as reading");
    }

    if (reading) {
      console.log("Entré a delete reading :", book.id);
      setReading(false);
      console.log("READ-", reading);

      dispatch(deleteReading(book.id, userId));
      toast.warning("Book mark as unreading");
    }

    if (readChange) {
      setTimeout(() => readChange((prevRead) => !prevRead), 300);
    }
  }

  const containerRef = useRef(null);
  const spanRef = useRef(null);
  const [fontSize, setFontSize] = useState("64px");

  useEffect(() => {
    if (book?.title?.length < 30) setFontSize("64px");

    if (book?.title?.length > 30) setFontSize("48px");

    if (book?.title?.length > 40) setFontSize("40px");
  }, [book.title, fontSize]);

  return (
    modal && (
      <OverLay className={catalogue ? "catalogue" : "normal"}>
        <Info>
          <div
            ref={containerRef}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "40px",
              margin: 0,
              padding: 0,
            }}
          >
            <H1 ref={spanRef} fontSize={fontSize}>
              {book.title}
            </H1>
            <Props>
              {book.averageRating ? (
                <StarRating rating={book.averageRating} />
              ) : (
                <StarRating rating={0} />
              )}
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
              padding: 0,
            }}
          >
            <H2 style={{ fontStyle: "italic" }}>{book.author?.name}</H2>
            <H3>{book.publisher}</H3>
          </div>
          <Description>{book.description}</Description>
          {currentUser.subscription ? (
            <div
              name="buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 0,
                padding: "0px 70px 0px 70px",
              }}
            >
              <ButtonDetail
                onClick={(e) => handleReading(e)}
                colorFondo={"#622CD4"}
                colorHover={"#7637FD"}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ReadingIcon
                    style={{
                      fill: "white",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  Read
                </div>
              </ButtonDetail>
              <ButtonDetail
                onClick={(e) => handleFavorite(e)}
                title={!favorite ? "Add to Favorites" : "Remove from Favorites"}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {!favorite ? (
                    <FavoriteIcon
                      style={{
                        fill: "white",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  ) : (
                    <UnfavoriteIcon
                      style={{
                        stroke: "white",
                        fill: "none",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  )}
                  Favorite
                </div>
              </ButtonDetail>
              <ButtonDetail
                onClick={(e) => handleReaded(e)}
                title={!readed ? "Add to Finished" : "Remove from Finished"}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {!readed ? (
                    <FinishedIcon
                      style={{
                        stroke: "white",
                        fill: "none",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  ) : (
                    <UnfinishedIcon
                      style={{
                        stroke: "white",
                        fill: "none",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  )}
                  Finished
                </div>
              </ButtonDetail>
            </div>
          ) : (
            <div style={{ fontWeight: 800, fontSize: 20 }}>
              SUBSCRIBE NOW TO START READING
            </div>
          )}
        </Info>
        <Cover src={book.cover} />
        <Reviews book={book} />
      </OverLay>
    )
  );
}
