import React from "react";
import {
  CardImgRecomended,
  ImgContainerRecomended,
  SingleCardContainerRecomended,
  DescriptionCardConteinerRecomended,
  H1Recomended,
  H2Recomended,
  ColumnConteinerRecomended,
  DescriptionRecomended,
  SubtitleAndYear,
  TitleAndRating,
} from "../styles/CardRecomended";


export default function Card({ title, publishedDate, description, averageRating, cover, genre, author, back_cover }) {

  let bookSliced = "";
  let bookConcat = "";
  description &&
  (description < 600 ? bookSliced=description: bookSliced=description.slice(0,600));
  bookSliced[bookSliced.length-1]!=="."? bookConcat=bookSliced.concat("...")
  :bookConcat=bookSliced;


  return (
    <SingleCardContainerRecomended>
      <ImgContainerRecomended>
        <CardImgRecomended src={cover} alt="img not found" />
        <CardImgRecomended src={back_cover} alt="img not found" />
      </ImgContainerRecomended>

      <ColumnConteinerRecomended>
        <TitleAndRating>
          <H1Recomended>{title}</H1Recomended>
          <H1Recomended>{averageRating}</H1Recomended>
        </TitleAndRating>

        <SubtitleAndYear>
          <H2Recomended>Author: {author.name}</H2Recomended>
          <H2Recomended>Year: {publishedDate}</H2Recomended>
        </SubtitleAndYear>
        <H2Recomended>Genre: {genre.name}</H2Recomended>
        <DescriptionCardConteinerRecomended>
          <DescriptionRecomended>{bookConcat}</DescriptionRecomended>
        </DescriptionCardConteinerRecomended>
      </ColumnConteinerRecomended>
    </SingleCardContainerRecomended>
  );
}
