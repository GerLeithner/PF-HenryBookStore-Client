import axios from "axios";

// ------------------- BOOK CRUD ------------------------------------

export function getBooks() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/books");
    return dispatch({
      type: "GET_BOOKS",
      payload: json.data,
    });
  };
}

export function getBookById(id) {
  return async function (dispatch) {
    try {
      var obj = await axios.get("http://localhost:3001/books/" + id);
      return dispatch({
        type: "GET_BOOK_BY_ID",
        payload: obj.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBookByTitle(title) {
  return async function (dispatch) {
    console.log("Searching book", title);
    try {
      var obj = await axios.get("http://localhost:3001/books?title=" + title);
      return dispatch({
        type: "GET_BOOK_BY_TITLE",
        payload: obj.data,
      });
    } catch (e) {
      alert(title + " was not found, try another title");
    }
  };
}

export function createBook(payload) {
  return async function () {
    try {
      console.log("payload", payload);
      const response = await axios.post("http://localhost:3001/books", payload);
      console.log("response:", response);
      return response;
    }
    catch(e) {
      console.log(e);
    }
  };
}

export function editBook(payload) {
  return async function () {
    console.log("payload", payload);
    const response = await axios.put("http://localhost:3001/books", payload);
    console.log("response:", response);
    return response;
  };
}

export function disableBook(id) {
  return async function () {
    try {
      console.log("id ", id);
      const response = await axios.delete("http://localhost:3001/books/" + id);
      console.log("response:", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

// ------------------- BOOK CUSTOM GETS ------------------------------------

export function getTrendingBooks() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/books/trending");
    return dispatch({
      type: "GET_TRENDING_BOOKS",
      payload: json.data,
    });
  };
}

export function getNewsBooks() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/books/news");
    return dispatch({
      type: "GET_NEW_BOOKS",
      payload: json.data,
    });
  };
}

export function getRecomendedBooks() {
  return async function (dispatch) {
    //
    var json = await axios.get(
      "https://run.mocky.io/v3/8ae4e29e-1eb4-4930-ac19-049a097c7989"
    );
    return dispatch({
      type: "GET_RECOMENDED_BOOKS",
      payload: json.data,
    });
  };
}

// ------------------- BOOK SORTS AND FILTERS ------------------------------------

export function sortBooksByTitle(payload) {
  return {
    type: "SORT_BOOKS_BY_TITLE",
    payload,
  };
}

export function sortBooksByPublishedDate(payload) {
  return {
    type: "SORT_BOOKS_BY_PUBLISHED_DATE",
    payload,
  };
}

export function filterBooksByGenre(payload) {
  return {
    type: "FILTER_BOOKS_BY_GENRE",
    payload,
  };
}

export function filterBooksByStatus(payload) {
  return {
    type: "FILTER_BOOKS_BY_STATUS",
    payload,
  };
}

export function cleanBookDetail(payload) {
  return {
    type: "CLEAN_BOOK_DETAIL",
    payload,
  };
}

// ------------------- AUTHORS & GENRES ------------------------------------

export function getGenres() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: json.data,
      });
    }
    catch(e) {
      console.log(e);
    }
  };
}

export function getAuthors() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/authors");
      return dispatch({
        type: "GET_AUTHORS",
        payload: json.data,
      });
    }
    catch(e) {
      console.log(e);
    }
  };
}

// ---------------------------- USER -----------------------------------------

export function getAllUsers(payload) {
  return async function (dispatch) {
    try {
      const users = await axios.get(
        "http://localhost:3001/user", payload
      );
      return dispatch({
        type: "GET_ALL_USERS",
        payload: users.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getUserById(id) {
  return async function (dispatch) {
    try {
      const user = await axios.get(
        `http://localhost:3001/user/${id}`
      );
      return dispatch({
        type: "GET_USER_BY_ID",
        payload: user.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getCurrentUser(payload) {
  return async function (dispatch) {
    try {
      const user = await axios.post(
        "http://localhost:3001/user/register", payload
      );
      return dispatch({
        type: "GET_CURRENT_USER",
        payload: user.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function sortUsersByName(payload) {
  return {
    type: "SORT_USERS_BY_NAME",
    payload,
  };
}


// ------------------- OTHER MODELS ------------------------------------

export function addFavorite(id,userId) {
  return async function (dispatch) {
    try {
        console.log("BOOKIDACTION:",id)
        console.log("payload USERID", userId)
        const response= await axios.post("http://localhost:3001/books/" + id + "/favorite", userId);
        console.log("response:", response)
        
        return response;
      
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteFavorite(id, userId){
  return async function(dispatch){
    try{
      console.log("payload ID DELETE:",id)
      console.log("payload USERID DELETE", userId)
      const deleteResponse=await axios.delete("http://localhost:3001/books/" + id +"/favorite", {data:{userId}});
      console.log("RESPONSE DELETE",deleteResponse)
      return deleteResponse.data.json;
    }catch(e){
      console.log(e);
    }
  }
}

export function addReaded(id,userId) {
  return async function (dispatch) {
    try {
      console.log("payload ID:",id)
      console.log("payload USERID", userId)
        const response= await axios.post("http://localhost:3001/books/" + id + "/read", userId);
        console.log("response:", response)
        return response;
      
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteReaded(id,userId){
  return async function(dispatch){
    try{
      await axios.delete("http://localhost:3001/books/" + id +"/read",{data:{userId}});
      return dispatch({
        type:"DELETE_READED",
        payload:id,
      });
    }catch(e){
      console.log(e);
    }
  }
}

export function addReading(id,userId) {
  return async function (dispatch) {
    try {
      console.log("payload ID:",id)
      console.log("payload USERID", userId)
        const response= await axios.post("http://localhost:3001/books/" + id + "/reading",userId);
        console.log("response:", response)
        return response;
      
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteReading(id,userId){
  return async function(dispatch){
    try{
      console.log("payload ID:",id)
      console.log("payload USERID", userId)
      await axios.delete("http://localhost:3001/books/" + id +"/reading",{data:{userId}});
      return dispatch({
        type:"DELETE_READING",
        payload:id,
      });
    }catch(e){
      console.log(e);
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