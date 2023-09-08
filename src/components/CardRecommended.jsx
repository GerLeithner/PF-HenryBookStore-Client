import React from "react";
import {
  CardImgRecommended,
  ImgContainerRecommended,
  SingleCardContainerRecommended,
  DescriptionCardConteinerRecommended,
  H1Recommended,
  H2Recommended,
  ColumnConteinerRecommended,
  DescriptionRecommended,
  SubtitleAndYear,
  TitleAndRating,
  StarsContainer,
} from "../styles/CardRecommended";

import { StarDetail } from "../styles/Detail";
import starFill from "../icons/starFill.svg";
import starEmpty from "../icons/starEmpty.svg";

export default function Card({
  title,
  publishedDate,
  description,
  averageRating,
  cover,
  genre,
  author,
  back_cover,
}) {
  let bookSliced = "";
  let bookConcat = "";
  description &&
    (description < 600
      ? (bookSliced = description)
      : (bookSliced = description.slice(0, 600)));
  bookSliced[bookSliced.length - 1] !== "."
    ? (bookConcat = bookSliced.concat("..."))
    : (bookConcat = bookSliced);

  var rating = Math.floor(averageRating);

  var stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push("star");
  }
  if (averageRating > rating) {
    stars.push("half");
  }

  return (
    <SingleCardContainerRecommended>
      <ImgContainerRecommended>
        <CardImgRecommended src={cover} alt="img not found" />
        <CardImgRecommended src={back_cover} alt="img not found" />
      </ImgContainerRecommended>
      <ColumnConteinerRecommended>
        <TitleAndRating>
          <H1Recommended>{title}</H1Recommended>
          <StarsContainer>
            {stars &&
              stars.map((s) =>
                s === "star" ? (
                  <StarDetail src={starFill} alt="n" />
                ) : (
                  <StarDetail src={starEmpty} alt="n" />
                )
              )}
          </StarsContainer>
        </TitleAndRating>
        <SubtitleAndYear>
          <H2Recommended>Author: {author.name}</H2Recommended>
          <H2Recommended>Year: {publishedDate}</H2Recommended>
        </SubtitleAndYear>
        <H2Recommended>Genre: {genre.name}</H2Recommended>
        <DescriptionCardConteinerRecommended>
          <DescriptionRecommended>{bookConcat}</DescriptionRecommended>
        </DescriptionCardConteinerRecommended>
      </ColumnConteinerRecommended>
    </SingleCardContainerRecommended>
  );
}
