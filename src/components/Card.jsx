import React, { useState, useEffect } from "react";
import { editState, getCurrentUser } from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactComponent as FavoriteIcon } from "../icons/add-circle.svg";
import { ReactComponent as ReadIcon } from "../icons/book-circle.svg";
import { ReactComponent as FinishedIcon } from "../icons/checkRead.svg";
import { ReactComponent as UnfinishedIcon } from "../icons/circle-x.svg";
import { ReactComponent as UnfavoriteIcon } from "../icons/minus-circle.svg";

import {
  getBookById,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
  turnOnModal,
  getUser,
} from "../redux/actions";

import {
  CardImg,
  MenuConteiner,
  ImgContainer,
  CardIcon,
  IconsContainer,
  TitleContainer,
} from "../styles/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card({
  id,
  cover,
  readChange,
  title,
  read,
  favorites,
  favoritesChange,
  readeds,
  readedsChange,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);
  const book = useSelector((state) => state.bookDetail);
  const dispatch = useDispatch();

  const { isAuthenticated, user, isLoading } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    //Veo si es favorito
    if (
      currentUser?.Favorites.map((f) => {
        return f.id;
      }).includes(id)
    ) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }

    //Veo si fue Leído
    if (
      currentUser?.Read.map((f) => {
        return f.id;
      }).includes(id)
    ) {
      setReaded(true);
    } else {
      setReaded(false);
    }

    //Veo si está siendo leído
    if (
      currentUser?.Reading.map((f) => {
        return f.id;
      }).includes(id)
    ) {
      setReading(true);
    } else {
      setReading(false);
    }
  }, [dispatch, currentUser]);

  function handleClick(e) {
    e.preventDefault(e);
    dispatch(editState(false));
    dispatch(turnOnModal());
    setIsHovering(false);
    window.scrollTo(0, 0);
    dispatch(getBookById(id));
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const userId = { userId: currentUser && currentUser.id };

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      setFavorite(true);

      dispatch(addFavorite(id, userId));
      toast.success("Book added to your favorites");
    }

    if (favorite) {
      setFavorite(false);

      dispatch(deleteFavorite(id, userId));

      toast.warning("Book removed from your favorites");
    }

    if (favoritesChange) {
      setTimeout(() => favoritesChange(!favorites), 300);
    }
  }

  function handleReaded(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      console.log("Entré a add readed :", id);
      setReaded(true);
      console.log("READ+", readed);

      dispatch(addReaded(id, userId));
      toast.success("Book added to finished");
    }

    if (readed) {
      console.log("Entré a delete readed :", id);
      setReaded(false);
      console.log("READ-", readed);

      dispatch(deleteReaded(id, userId));
      toast.warning("Book removed from finished");
    }
    if (readedsChange) {
      setTimeout(() => readedsChange(!readeds), 300);
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

    if (readChange) {
      setTimeout(() => readChange((prevRead) => !prevRead), 300);
    }
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <ImgContainer>
        <CardImg src={cover} alt="img not found" />
        <MenuConteiner
          onClick={(id) => {
            handleClick(id);
          }}
          className={isHovering ? "active" : "inactive"}
        >
          <TitleContainer className={title.length > 40 ? "long" : "short"}>
            {title}
          </TitleContainer>
          <IconsContainer>
            <CardIcon>
              {!favorite ? (
                <FavoriteIcon
                  className="fillWhite"
                  title="Add Favorite"
                  onClick={(e) => {
                    handleFavorite(id, userId);
                    e.stopPropagation();
                  }}
                />
              ) : (
                <UnfavoriteIcon
                  className="finished"
                  title="Delete Favorite"
                  onClick={(e) => {
                    handleFavorite(id, userId);
                    e.stopPropagation();
                  }}
                />
              )}
            </CardIcon>

            {/*             <CardIcon>
              <ReadIcon
                className="fillWhite"
                onClick={(e) => {
                  handleReading(id, userId);
                  e.stopPropagation();
                }}
                style={{
                  width: "61px",
                  height: "62px",
                }}
              />
            </CardIcon> */}
            <CardIcon>
              {!readed ? (
                <FinishedIcon
                  className="finished"
                  title="Add to Finished"
                  onClick={(e) => {
                    handleReaded(id, userId);
                    e.stopPropagation();
                  }}
                />
              ) : (
                <UnfinishedIcon
                  className="finished"
                  title="Remove from Finished"
                  style={{
                    width: "67px",
                    height: "68px",
                    transform: "translateY(-3px)",
                  }}
                  onClick={(e) => {
                    handleReaded(id, userId);
                    e.stopPropagation();
                  }}
                />
              )}
            </CardIcon>
          </IconsContainer>
        </MenuConteiner>
      </ImgContainer>
    </div>
  );
}
