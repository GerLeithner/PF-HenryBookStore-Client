import React from "react";
import "./CardRecomended.css";
// import { bookDelete } from "../actions";
// import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import {
  CardImgRecomended,
  ImgContainerRecomended,
  SingleCardContainerRecomended,
  DescriptionCardConteinerRecomended,
  H1Recomended,
  H2Recomended,
  ColumnConteinerRecomended,
  DescriptionPRecomended,
  SubtitleAndYear,
  TitleAndRating,
} from "../styles/CardRecomended";


export default function Card({
  id,
  title,
  publishedDate,
  description,
  averageRating,
  subtitle,
  cover,
  genre,
  author,
  back_cover,
}) {
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
        <H2Recomended>{subtitle?subtitle:`Author: ${author.name}`}</H2Recomended>
        <H2Recomended>Year: {publishedDate}</H2Recomended>
        </SubtitleAndYear>
       {subtitle && (<H2Recomended>Author: {author.name}</H2Recomended>)}
        <H2Recomended>Genre: {genre.name}</H2Recomended>

        <DescriptionCardConteinerRecomended>
          <DescriptionPRecomended>{description}</DescriptionPRecomended>
        </DescriptionCardConteinerRecomended>
      </ColumnConteinerRecomended>
    </SingleCardContainerRecomended>
  );
}

{
  /* {
                  id.length > 8 && 
                        <button  value={id} onClick={e=>{handleDeleteClick(e)}}>Delete Book</button>
                }  */
}




{/* <GridConteinerRecomended>
          <LeftColumnRecomended>
            <TitleCardConteinerRecomended>
              <Link to={"/home/" + id} key={id} className="linkCard">
                <H1Recomended>{title}</H1Recomended>
              </Link>
            </TitleCardConteinerRecomended>
            <TitleCardConteinerRecomended>
              <H2Recomended>{subtitle}</H2Recomended>
            </TitleCardConteinerRecomended>
            <TitleCardConteinerRecomended>
              <H2Recomended>{author.name}</H2Recomended>
            </TitleCardConteinerRecomended>
          </LeftColumnRecomended>

          <RigthColumnRecomended>
            <H4Recomended>{averageRating}</H4Recomended>
            <H4Recomended>{publishedDate}</H4Recomended>
            <H4Recomended>{genre.name}</H4Recomended>
          </RigthColumnRecomended>
        </GridConteinerRecomended> */}