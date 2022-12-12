import axios from 'axios';

export function getBooks(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/books');
        
        // var json= await axios.get('https://run.mocky.io/v3/dc992cfc-8e36-40eb-b392-dd52ba109e26')
        // var json= await axios.get('https://run.mocky.io/v3/a22c7e5a-69f7-4784-bdfc-641ef666af76')
        // console.log("JSON.DATA",json.data)
        return dispatch({
            type:'GET_BOOKS',
            payload:json.data
        })
    }
}


export function getGenres(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/genres');
        return dispatch({
            type:'GET_GENRES',
            payload:json.data
        })
    }
}

export function getAuthors(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/authors');
        return dispatch({
            type:'GET_AUTHORS',
            payload:json.data
        })
    }
}

export function getTrendingBooks(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/books/trending');
        console.log("TRENDING REDUCER ",json.data)
        return dispatch({
            type:'GET_TRENDING_BOOKS',
            payload:json.data
        })
    }
   
    }

export function createBook(payload){
    return async function(dispatch){
        console.log("payload", payload)
        const response = await axios.post('http://localhost:3001/books',payload);
        console.log("response:", response)
        return response;
    }
}

export function filterBookByGenre(payload){
    return {
        type:'FILTER_BY_GENRE',
        payload
    }
}

export function sortByTitle(payload){
    return{
        type:'SORT_BY_TITLE',
        payload
    }
}
export function sortByPublisherDate(payload){
    return{
        type:'SORT_BY_PUBLISHER_DATE',
        payload
    }
}

export function getBookByTitle(title){
    return async function(dispatch){
        
        console.log("Searching book", title)
        try{
    var obj= await axios.get("http://localhost:3001/books?title="+ title); 
    return dispatch({
        type: 'GET_BY_TITLE',
        payload:obj.data
    })
        }catch(e){
            alert(title+" was not found, try another title")
        }
    }
}

// export function getBookByAuthor(author){
//     return async function(dispatch){
        
//         console.log("Searching book", author)
//         try{
//     var obj= await axios.get("http://localhost:3001/books?name="+ author); 
//     return dispatch({
//         type: 'GET_BY_AUTHOR',
//         payload:obj.data
//     })
//         }catch(e){
//             alert(author+" was not found, try another author")
//         }
//     }
// }

export function bookDetail(id){
    return async function (dispatch){
        try{
            var obj= await axios.get('http://localhost:3001/books/'+ id);
            return dispatch({
                type:'GET_DETAILS',
                payload:obj.data}
                )
                
        }catch(e){
            console.log(e)
        }
    }
}

export function cleanDetail(payload){
    return {
        type:'CLEAN_DETAIL',
        payload
       
    }
}

export function bookDelete(id){
    return async function(dispatch){
        try{
            await axios.delete('http://localhost:3001/books/'+ id);
            return dispatch({
                type:'DELETE_BOOK_DB',
                payload:id})
                
        }catch(e){
            console.log(e)
        }
    }
   
}