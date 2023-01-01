import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import {
  cleanBookDetail,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
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
  UlCard,
  MenuConteiner,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";

import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import starFill from "../icons/starFill.svg";
import starHalf from "../icons/starHalf.svg";
import closeIcon from "../icons/closeIcon.svg";
import { StarsContainer } from "../styles/CardRecomended";
import BookReviews from "../components/BookReviews.jsx"

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

  const currentUser = useSelector((state) => state.currentUser);

  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);

  const { isAuthenticated, user, isLoading } = useAuth0();


  // const bookId = props.match.params.id;
  // console.log("BOOK ID:", bookId);
  // console.log("PROPS",props)
  const userId={userId:currentUser && currentUser.id};

  
  // userId && console.log("USERID",userId)

  // const book = useSelector((state) => state.detail);

  // useEffect(() => {
  //   dispatch(bookDetail(book.id));

  //   return () => {
  //     console.log("Detail Clean Up");
  //     dispatch(cleanBookDetail());
  //   };
  // }, [dispatch]);

  function handleCloseClick(e) {
    e.preventDefault(e);
    setModal(false);
    console.log("e.target.value", e.target.value);
    dispatch(cleanBookDetail(e.target.value));
  }

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)
    console.log("Entré a favorite:", id);
    if (!favorite) {
      setFavorite(!favorite);
      console.log("FAV+", favorite);
      dispatch(addFavorite(id, userId));
    }
    if (favorite) {
      setFavorite(!favorite);
      console.log("FAV-", favorite);
      dispatch(deleteFavorite(id, userId));
    }
  }

  function handleReaded(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)
    console.log("Entré a readed:", id);
    if (!readed) {
      setReaded(!readed);
      console.log("READ+", readed);
      dispatch(addReaded(id, userId));
    }
    if (readed) {
      setReaded(!readed);
      console.log("READ-", readed);
      dispatch(deleteReaded(id, userId));
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

  return (
    <>
      {modal && (
        <OverLay>
          <SingleCardContainerDetail>
            <ImgAndInfo>
              <ImgContainerDetail>
                <CardImgDetail src={book.cover} alt="img not found" />
              </ImgContainerDetail>

              <ColumnConteinerDetail>
                <ButtonCloseDetail
                  onClick={(e) => {
                    handleCloseClick(e);
                  }}
                >
                  <img src={closeIcon} alt="n" />
                </ButtonCloseDetail>
                <MenuConteiner right={"310px"} top={"120px"}>
                  <MenuTrigger
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <img src={caretIcon} />
                  </MenuTrigger>
                  <DropDownMenu
                    className={`dropdown-menu ${open ? "active" : "inactive"}`}
                  >
                    <UlCard>
                      <DropdownItem
                        icon={reviewIcon}
                        value={book.id}
                        role="button"
                      />
                      <DropdownItem
                        icon={!readed ? readedIcon : readedIconFill}
                        value={book.id}
                        handle={(e) => {
                          handleReaded(book.id, userId);
                        }}
                        role="button"
                      />
                      <DropdownItem
                        icon={!favorite ? favoriteIcon : favoriteFillIcon}
                        value={book.id}
                        handle={(e) => {
                          handleFavorite(book.id, userId);
                        }}
                        role="button"
                      />
                    </UlCard>
                  </DropDownMenu>
                </MenuConteiner>

                <TitleAndRating>
                  <H1Detail>{book.title}</H1Detail>

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
                </TitleAndRating>
                <SubtitleAndYear>
                  <H2Detail>
                    { book.subtitle ? 
                      book.subtitle : `Author: ${book && book.author && book.author.name}`
                    }
                  </H2Detail>
                  <H2Detail>Year: {book.publishedDate}</H2Detail>
                </SubtitleAndYear>
                {book.subtitle && (
                  <H2Detail>Author: {book.author.name}</H2Detail>
                )}
                {book && book.genre && (
                  <H2Detail>Genre:{book.genre.name}</H2Detail>
                )}
                <DescriptionCardConteinerDetail>
                  <DescriptionPDetail>{book.description}</DescriptionPDetail>
                </DescriptionCardConteinerDetail>
              </ColumnConteinerDetail>
            </ImgAndInfo>
            <ReviewConteiner>
            { book && book.reviews && <BookReviews/> }
            </ReviewConteiner>
            
            {/* <ReviewConteiner>
            
              {book && book.reviews && book.reviews[0] ? (
                <>
                  <UserAndStars>
                    <H4Detail>
                      Review by {book.reviews[1].user.userName}
                    </H4Detail>

                    <StarsContainer>
                      {review1Star &&
                        review1Star.map((s) =>
                          s === "star" ? (
                            <StarDetail src={starFill} alt="n" />
                          ) : (
                            <StarDetail src={starHalf} alt="n" />
                          )
                        )}
                    </StarsContainer>
                  </UserAndStars>
                  <H5Detail>{book.reviews[0].comment}</H5Detail>
                </>
              ) : (
                <div>
                  <H4Detail>
                    There are no reviews for this book yet, be the first to
                    write one.
                  </H4Detail>
                </div>
              )}
            </ReviewConteiner>
            {book && book.reviews && book.reviews[1] ? (
              <ReviewConteiner>
                <UserAndStars>
                  <H4Detail>Review by {book.reviews[1].user.userName}</H4Detail>
                  <StarsContainer>
                    {review2Star &&
                      review2Star.map((s) =>
                        s === "star" ? (
                          <StarDetail src={starFill} alt="n" />
                        ) : (
                          <StarDetail src={starHalf} alt="n" />
                        )
                      )}
                  </StarsContainer>
                </UserAndStars>

                <H5Detail>{book.reviews[1].comment}</H5Detail>
              </ReviewConteiner>
            ) : <></> } */}
            <ButtonsConteiner>
              <ButtonDetail>Show More Reviews</ButtonDetail>
              <ButtonDetail>Leave a Review</ButtonDetail>
            </ButtonsConteiner>
          </SingleCardContainerDetail>
        </OverLay>
      )}
    </>
  );
}
