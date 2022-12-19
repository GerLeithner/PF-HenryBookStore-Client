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
  ButtonDetail,
} from "../styles/Detail";


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
    book && book.description &&
     (book.description<950?bookSliced=book.description: bookSliced=book.description.slice(0,950).concat(points))
console.log("BOOKSLICED",bookSliced)


  function handleCloseClick(e) {
    e.preventDefault(e);
    setModal(false);
    dispatch(cleanDetail());
  }
 
// export default function CardDetail(props) {
//   const dispatch = useDispatch();
  
//   const bookId = props.match.params.id;
//   console.log("BOOK ID:", bookId);
//   console.log("PROPS",props)

//   const book = useSelector((state) => state.detail);

//   useEffect(() => {
//     dispatch(getGenres());
//     dispatch(getAuthors());
//     dispatch(bookDetail(bookId));

//     return () => {
//       console.log("Detail Clean Up");
//       dispatch(cleanDetail());
//     };
//   }, [dispatch]);





  return (
  <>
  {modal &&
  <OverLay>
    <SingleCardContainerDetail>

      <ImgContainerDetail>
        
          <CardImgDetail src={book.cover} alt="img not found" />
        
      </ImgContainerDetail>

      <ColumnConteinerDetail>
        <TitleAndRating>
          <H1Detail>{book.title}</H1Detail>
          <H1Detail>{book.averageRating}</H1Detail>

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
          <DescriptionPDetail>{bookSliced}</DescriptionPDetail>
        </DescriptionCardConteinerDetail>
      </ColumnConteinerDetail>
      
    </SingleCardContainerDetail>
    {/* <Link to={"/home"}>
    </Link> */}
        <ButtonDetail onClick={e=>{handleCloseClick(e)}}>X</ButtonDetail>
      
    </OverLay>
    }
    </>
  );
}