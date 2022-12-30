import React,{useState} from "react";
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
import {
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded
} from "../redux/actions";
import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import starFill from "../icons/starFill.svg";
import starHalf from "../icons/starHalf.svg";
import closeIcon from "../icons/closeIcon.svg";
import {StarsContainer} from "../styles/CardRecomended"



function DropdownItem(props) {
  return (
    <li>
      <img src={props.icon} alt="n" />
    </li>
  );
}




export default function CardDetail({book,modal,setModal}) {
  const dispatch = useDispatch();
  
  const [open,setOpen]=useState(false)
  const [favorite,setFavorite]=useState(false)
  const [readed,setReaded]=useState(false)
  const [reading,setReading]=useState(false)
  
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



  function handleCloseClick(e) {
    e.preventDefault(e);
    setModal(false);
    dispatch(cleanDetail());
  }
 
  function handleFavorite(e) {
    e.preventDefault();
    console.log("Entré a favorite:", e);
    if(!favorite){
      dispatch(addFavorite());
      setFavorite(!favorite)
      console.log("FAV1",favorite)
    }
    if(favorite){
      dispatch(deleteFavorite());
      setFavorite(!favorite)
      console.log("FAV2",favorite)
    }
    
  }
  
  function handleReaded(e) {
    e.preventDefault();
    console.log("Entré a readed:", e);
    if(!readed){
      dispatch(addReaded());
      setReaded(!readed)
      console.log("READ1",readed)
    }
    if(readed){
      dispatch(deleteReaded());
      setReaded(!readed)
      console.log("READ2",readed)
    }
    
  }







function starRating(rating){

   let ratingFloor=Math.floor(rating)
  
   let stars=[]
   for(let i=0;i<ratingFloor;i++){
    stars.push("star")
    }
    let mod=rating % ratingFloor
 
    if(mod>0){
      stars.push("half")
    }
return stars
}

var starAverage=book && book.averageRating && starRating(book.averageRating)



var review1Star=book && book.reviews && book.reviews[0] && starRating(book.reviews[0].score)

var review2Star=book && book.reviews && book.reviews[1] && starRating(book.reviews[1].score)


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
      
    <ButtonCloseDetail onClick={e=>{handleCloseClick(e)}}><img src={closeIcon} alt="n" /></ButtonCloseDetail>
<MenuConteiner right={"310px"} top={"120px"} >
          <MenuTrigger
            onClick={() => {setOpen(!open);}}>
            <img src={caretIcon} />
          </MenuTrigger>
          <DropDownMenu
            className={`dropdown-menu ${open ? "active" : "inactive"}`}
          >
            <UlCard>
              <DropdownItem icon={reviewIcon}/>
              <DropdownItem icon={readedIcon} onClick={e=>{handleReaded(e)}}/>
              <DropdownItem icon={favoriteIcon} onClick={e=>{handleFavorite(e)}}/>
            </UlCard>
          </DropDownMenu>
        </MenuConteiner>




        <TitleAndRating>
          <H1Detail>{book.title}</H1Detail>
         

          <StarsContainer>
          {
            starAverage && starAverage.map(s=>(s==="star"?
            <StarDetail src={starFill} alt="n" />:
            <StarDetail src={starHalf} alt="n" />
            ))
            
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
          <DescriptionPDetail>{book.description}</DescriptionPDetail>
        </DescriptionCardConteinerDetail>
      </ColumnConteinerDetail>
      </ImgAndInfo>
      <ReviewConteiner>
          
          {book && book.reviews && book.reviews[0]?(
            <>
            <UserAndStars>
            <H4Detail>Review by {book.reviews[1].user.userName}</H4Detail>

            <StarsContainer>
          {
            review1Star && review1Star.map(s=>(s==="star"?
            <StarDetail src={starFill} alt="n" />:
            <StarDetail src={starHalf} alt="n" />
            ))
            }
          </StarsContainer>
          </UserAndStars>
            <H5Detail>{book.reviews[0].comment}</H5Detail>
            </>
          ):(<div><H4Detail>There are no reviews for this book yet, be the first to write one.</H4Detail></div>)}
          </ReviewConteiner>

         
          {book && book.reviews && book.reviews[1]?(
             <ReviewConteiner>
           
            <UserAndStars>
              <H4Detail>Review by {book.reviews[1].user.userName}</H4Detail>
            <StarsContainer>
          {
            review2Star && review2Star.map(s=>(s==="star"?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>:
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
              </svg>
            ))
            } 
          </StarsContainer>
            </UserAndStars>

            <H5Detail>{book.reviews[1].comment}</H5Detail>
            </ReviewConteiner>
          ):(<></>)}
          
          
        <ButtonsConteiner>
          <ButtonDetail>Show More Reviews</ButtonDetail>
          <ButtonDetail>Leave a Review</ButtonDetail>
        </ButtonsConteiner>
        
      
    </SingleCardContainerDetail>
    {/* <Link to={"/home"}>
    </Link> */}
        
      
    </OverLay>
    }
    </>
  );
}
