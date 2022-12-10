import React, { useState,useEffect }  from "react";
import { Link, useHistory } from "react-router-dom";
import{getGenres,createBook} from "../../redux/actions"
import { useDispatch,useSelector} from "react-redux";
import "./CreateBook.css"
// const imgVal = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
const imgVal = /(https?:\/\/)?([\w])+\.{1}([a-zA-Z]{2,63})([\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

function validate(input){
    let errors={};
   
    if(!input.img || !imgVal.test(input.img) ){
        errors.img='Insert a valid link'
        
    }
    if(!input.title){
        errors.title='A valid title is required';
    
    }else if(!input.author){
        errors.hp='A valid author is required'
    // }else if( input.attack <=0 || input.attack >250){
    //     errors.attack ='Choose a number between 1 and 250'
    // }else if(input.defense<=0 || input.defense>250){
    //     errors.defense='Choose a number between 1 and 250'
    // }else if(input.speed<=0 || input.speed>250){
    //     errors.speed='Choose a number between 1 and 250'
    // }else if(input.height<=0 || input.height>250){
    //     errors.height='Choose a number between 1 and 250'
    // }else if(input.weight<=0 || input.weight>250){
    //     errors.weight='Choose a number between 1 and 250'
   
    }
    
    return errors;
}



const CreateBook = () => {
    const dispatch=useDispatch()
    const genres=useSelector((state)=> state.genres)
    const history=useHistory()
    const [errors,setErrors]=useState({});
    const [input,setInput]=useState({

        // id,title,publishedDate,publisher,description,pages,averageRating,usersRating, cover, identifier,genres,author
        title: "",
        publishedDate: "",
        publisher: "",
        description: "",
        pages: "",
        averageRating: "",
        usersRating: "",
        cover: "",
        identifier:"",
        genres:[],
        author:""
       

    })
function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })
    console.log("ERRORS",errors)
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }))
    console.log("input",input)
    
}



function handleCheck(e){
    if(e.target.checked){
        
        setInput({
            ...input,
            genres:[...input.genres,e.target.value],
        })
        
        
        
        console.log("INPUTCHECK",input)
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        console.log(errors)
     
    }else if(!e.target.checked){
        setInput({
            ...input,
            genres:input.genres.filter(t=>t!==e.target.value)
        })
       
       
       
        console.log("INPUTCHECK",input)
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))

       
    }
}


function handleSubmit(e){
    e.preventDefault();
    setErrors(validate({
        ...input
    }))
    let errorsLength=Object.keys(errors).length;
    console.log("errorsLength",errorsLength)
    if(errorsLength>0){
        console.log("ErrorsSubmit",errors)
        alert("One or more fields have errors, please check them")
    }else{
        console.log("ErrorsSubmit",errors)
        dispatch(createBook(input))
    alert("The Book has been created")
    setInput({
        title: "",
        publishedDate: "",
        publisher: "",
        description: "",
        pages: "",
        averageRating: "",
        usersRating: "",
        cover: "",
        identifier:"",
        genres:[],
        author:""
        
    })
    history.push('/home')
    }
 
    
}




    useEffect(()=>{
        dispatch(getGenres());  
    },[dispatch]);





  return( 

    <div >
            <Link to='/home'><button>Back to Home</button></Link>
            <h1>Add a new Book</h1>
            
            <form>
                <div>
                <div>
            
            <div>
                <div>
                    
                    <input
                    type="text"
                    value={input.title}
                    name="title"
                    placeholder="Insert Title"
                    onChange={handleChange}/>
                    {errors.title && (
                        <p className='error'>{errors.title}</p>
                    )}
                </div>
                <div>
                    
                    <input
                    type="text"
                    value={input.author}
                    placeholder="Insert Author"
                    name="Author"
                    onChange={handleChange}/>

                    {errors.author && (
                        <p className='error'>{errors.author}</p>
                    )}
                </div>
                <div>
                    
                    <input
                    type="text"
                    value={input.description}
                    name="description"
                    placeholder="Insert Description"
                    onChange={handleChange}/>
                    {errors.Description && (
                        <p className='error'>{errors.description}</p>
                    )}
                    
                </div>
                <div>
                   
                    <input
                    type="number"
                    value={input.publisherDate}
                    name="publisherDate"
                    placeholder="Insert publisherDate"
                    onChange={handleChange}/>
                    {errors.publisherDate && (
                        <p className='error'>{errors.publisherDate}</p>
                    )}
                    
                </div>
                <div>
                
                    <input
                    type="text"
                    value={input.publisher}
                    name="publisher"
                    placeholder="Insert Publisher"
                    onChange={handleChange}/>
                    {errors.publisher && (
                        <p className='error'>{errors.publisher}</p>
                    )}
                    
                </div>
                <div>
                   
                    <input
                    type="number"
                    value={input.pages}
                    name="pages"
                    placeholder="Insert Pages"
                    onChange={handleChange}/>
                    {errors.pages && (
                        <p className='error'>{errors.pages}</p>
                    )}
                    
                </div>
                <div>
                    
                    <input
                    type="number"
                    placeholder="Insert averageRating"
                    value={input.averageRating}
                    name="averageRating"
                    onChange={handleChange}/>
                    {errors.averageRating && (
                        <p className='error'>{errors.averageRating}</p>
                    )}
                    
                </div>
                <div>
                   
                    
                    <input
                    type="text"
                    placeholder="Insert a link to a Cover image"
                    value={input.cover}
                    name="cover"
                    onChange={handleChange}
                    />
                    </div>
                    
                   {errors.cover ? (
                    <div>
                        <p className='error'>{errors.cover}</p>
                        <img src="https://www.comunidadbaratz.com/wp-content/uploads/Instrucciones-a-tener-en-cuenta-sobre-como-se-abre-un-libro-nuevo.jpg" width={"100px"} height={"100px"}/>
                        </div>
                        
                    ):(
                    <div>
                        <br/>
                        <br/>
                        <ul>The chosen image is:<li><img src={input.cover} alt="img not found" width={"100px"} height={"100px"}/></li></ul>
                    
                    </div>
                    )
                    
                    }
                    </div>
                </div>
                </div>

                
                <div>
                    <label>Select Genre:</label>
                    {errors.genres && (
                        <p className='error'>{errors.genres}</p>
                    )}
                    <br/>
                    <div>
                    {genres.map((el)=>(
                        <label key={el.id}><br></br><input
                        type="checkbox"
                        title={el.name}
                        value={el.name}
                        onClick={(e)=>handleCheck(e)}
                        key={el.id}/><br></br>
                        {el.name}


                        </label>
                    ))}
                    
                </div>
                </div>
                <div>
                <div>
                    <button
                    type="submit"
                    onClick={(e)=>handleSubmit(e)}>
                        Add New Book
                    </button>
                </div>
                <ul>The Book Genre is: 
                {input.genres.map(el=><li>{el}</li>)}  

                </ul>
                </div>
            </form>
        </div>
  )
};

export default CreateBook;
