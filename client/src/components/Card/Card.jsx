import React from "react";
import "./Card.css";
// import { bookDelete } from "../actions";
// import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";


export default function Card({id, title, publishedDate, description, averageRating, cover, genres, authors}){
    
    
    // const dispatch= useDispatch()
//    function handleDeleteClick(e){
//         dispatch(bookDelete(e.target.value));
//         alert("Book deleted")
//     };
// console.log("PROPS:", id, title, publishedDate, description, averageRating, cover, genre, author)
 
    return(
        <div>
               
                <Link to={"/home/"+ id} key={id} >
                <h3>{title}</h3>
                </Link>
                <h3>Authors:</h3>
                <div>
                {
                    authors.map((a)=>(
                       
                            <h4 key={a.id}>{a.name}</h4>
                        
                    ))

                }
                </div>
                <div>
                <Link to={"/home/"+ id} key={id} >
                <img src={cover} alt="img not found" />
                </Link>
                </div>
                <div >
                <h3 >Genres:</h3>
                
                <div>
                {
                    genres.map(g=>(
                        <h4 key={g.id}>{g.name}</h4>
                        
                    ))
                }
                
                <h3>Rating</h3>
                <h2>{averageRating}</h2>
                <h3>Summary</h3>
                <p>{description}</p>
                <h4>Published Date</h4>
                <h4>{publishedDate}</h4>

                
               
            
                </div>
                
                </div>
                {/* {
                  id.length > 8 && 
                        <button  value={id} onClick={e=>{handleDeleteClick(e)}}>Delete Book</button>
                }
                 */}
                
                
        
        </div>
        
    );
}