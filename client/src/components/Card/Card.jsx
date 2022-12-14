import React from "react";
import "./Card.css";
// import { bookDelete } from "../actions";
// import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { CardImg, ImgContainer, SingleCardContainer,TitleCardConteiner} from "../styles/Card";
import { H5Form } from "../styles/CreateBook";

export default function Card({
  id,
  title,
  publishedDate,
  description,
  averageRating,
  cover,
  genres,
  authors,
}) 


{
 
  return (



    
    <SingleCardContainer>
      
      {/* <h6>Authors:</h3> */}
      {/* <H4CardRating>{averageRating}</H4CardRating> */}

      




      <ImgContainer>
        <Link to={"/home/" + id} key={id} className="linkCard">
          <CardImg src={cover} alt="img not found" />
        </Link>
      </ImgContainer>

      
      <TitleCardConteiner>
      <Link to={"/home/" + id} key={id} className="linkCard">
        <H5Form>{title}</H5Form>
      </Link>
      </TitleCardConteiner>
      {/* <div>
        {authors.map((a) => (
          <H5Form key={a.id}>{a.name}</H5Form>
        ))}
      </div> */}
      {/* <div>
        <h3>Genres:</h3>

        <div>
          {genres.map((g) => (
            <h4 key={g.id}>{g.name}</h4>
          ))}

          <h3>Rating</h3>
          
          <h3>Summary</h3>
                <p>{description}</p>
          <h4>Published Date</h4>
                <h4>{publishedDate}</h4> 
        </div>
      </div>
      {
                  id.length > 8 && 
                        <button  value={id} onClick={e=>{handleDeleteClick(e)}}>Delete Book</button>
                } */}
                
    </SingleCardContainer>
  );
}
