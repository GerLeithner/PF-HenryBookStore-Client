import React from "react";
import "./Card.css";
// import { bookDelete } from "../actions";
// import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";


export default function Card({id, title, publishedDate, description, averageRating, cover, genre, author}){
    
    
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
                <h3>{author}</h3>
                
                <div>
                <Link to={"/home/"+ id} key={id} >
                <img src={cover} alt="img not found" />
                </Link>
                </div>
                <div >
                <h3 >Genre:</h3>
                
                <div>
                {
                    genre.map(el=>(
                        <div key={el.type}>
                            <h4 key={el}>{el}</h4>
                        </div>
                    ))
                }
                
                <h3>Rating</h3>
                <h2>{averageRating}</h2>
                <h3>Summary</h3>
                <p>{description}</p>

                
               
            
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