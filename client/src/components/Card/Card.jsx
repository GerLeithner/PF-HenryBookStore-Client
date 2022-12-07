import React from "react";
import "./Card.css";
// import { pokeDelete } from "../actions";
// import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";


export default function Card({title, cover, genre,id,author,price,reviews,rating,summary}){
    
    
    // const dispatch= useDispatch()
//    function handleDeleteClick(e){
//         dispatch(pokeDelete(e.target.value));
//         alert("Pokémon deleted")
//     };

 
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
                {/* <h3>${price}</h3> */}
                <h3>Rating</h3>
                <h2>{reviews.score}</h2>
                {/* <h3>Summary</h3>
                <p>{summary}</p> */}

                
               
            
                </div>
                
                </div>
                {/* {
                  id.length > 5 && 
                        <button  value={id} onClick={e=>{handleDeleteClick(e)}}>Delete Pokémon</button>
                }
                 */}
                
                
        
        </div>
        
    );
}