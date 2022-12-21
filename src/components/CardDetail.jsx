import React from "react";
import { useDispatch } from "react-redux";

import { cleanDetail } from "../redux/actions";
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
  ImgAndInfo,
  ButtonOptionsDetail,
  ButtonSelectDetail,
} from "../styles/Detail";


import {StarsContainer} from "../styles/CardRecomended"
import {ButtonCatalogue} from "../styles/Catalogue"


export default function CardDetail({book,modal,setModal}) {
  const dispatch = useDispatch();
  
  // const bookId = props.match.params.id;
  // console.log("BOOK ID:", bookId);
  // console.log("PROPS",props)

  // const book = useSelector((state) => state.detail);

  // useEffect(() => {
  //   dispatch(bookDetail(book.id));

  //   return () => {
  //     console.log("Detail Clean Up");
  //     dispatch(cleanDetail());
  //   };
  // }, [dispatch]);
    var bookSliced=""
    var points="..."
    var bookConcat=""
    book && book.description &&
     (book.description<950?bookSliced=book.description: 
      bookSliced=(book.description.slice(0,950)))

    bookSliced[bookSliced.length-1]!=="."? bookConcat=bookSliced.concat(points)
    :bookConcat=bookSliced;


  function handleCloseClick(e) {
    e.preventDefault(e);
    setModal(false);
    dispatch(cleanDetail());
  }
 


var rating=Math.floor(book.averageRating)

var stars=[]
for(let i=0;i<rating;i++){
stars.push("star")
}
var mod=book.averageRating % rating


  return (
  <>
  {modal &&
  <OverLay>
    <SingleCardContainerDetail>
      <ImgAndInfo>
      <ImgContainerDetail>
        
          <CardImgDetail src={book.cover} alt="img not found" />
        
      </ImgContainerDetail>

      <ColumnConteinerDetail>
    <ButtonCloseDetail onClick={e=>{handleCloseClick(e)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg></ButtonCloseDetail>
    <ButtonSelectDetail>
      <ButtonOptionsDetail value="" hidden>Options</ButtonOptionsDetail>
      <ButtonOptionsDetail value="review">Review</ButtonOptionsDetail>
      <ButtonOptionsDetail value="readed">Readed</ButtonOptionsDetail>
      <ButtonOptionsDetail value="favorite">Favorite</ButtonOptionsDetail>
    
</ButtonSelectDetail>




        <TitleAndRating>
          <H1Detail>{book.title}</H1Detail>
          {/* <H1Detail>{book.averageRating}</H1Detail> */}

          <StarsContainer>
          {
            stars && stars.map(s=>(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            ))
            
            } 
            {
             book.averageRating && rating && mod?(
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
              </svg>
             ): <></>
             
            }
            
          </StarsContainer>
  

        </TitleAndRating>
        <SubtitleAndYear>
        
          <H2Detail>
          {book.subtitle?book.subtitle:`Author: ${book && book.author &&
          book.author.name}`}
          
          </H2Detail>

        <H2Detail>Year: {book.publishedDate}</H2Detail>
        </SubtitleAndYear>
       {book.subtitle && (<H2Detail>Author: {book.author.name}</H2Detail>)}
    
        {book && book.genre &&(
          <H2Detail>Genre:{book.genre.name}</H2Detail>
        )}
        <DescriptionCardConteinerDetail>
          <DescriptionPDetail>{bookConcat}</DescriptionPDetail>
        </DescriptionCardConteinerDetail>
      </ColumnConteinerDetail>
      </ImgAndInfo>
      <ReviewConteiner>
          <H4Detail>Review by User 1</H4Detail>
          <H5Detail>Review 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, perferendis dolorum. Assumenda quibusdam sit illo fuga consectetur illum quis dicta nihil a! Facilis culpa quaerat at asperiores harum. Accusamus, error!</H5Detail>
          <H4Detail>Review by User 2</H4Detail>
          <H5Detail>Review 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, perferendis dolorum. Assumenda quibusdam sit illo fuga consectetur illum quis dicta nihil a! Facilis culpa quaerat at asperiores harum. Accusamus, error!</H5Detail>
          <div>
          <ButtonCatalogue>Show More Reviews</ButtonCatalogue>
          <ButtonCatalogue>Leave a Review</ButtonCatalogue>
        </div>
        </ReviewConteiner>
      
    </SingleCardContainerDetail>
    {/* <Link to={"/home"}>
    </Link> */}
        
      
    </OverLay>
    }
    </>
  );
}
