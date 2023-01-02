const initialState = {
  books: [],
  allBooks: [],
  authors: [],
  genres: [],
  bookDetail: {},
  trending: [],
  recomended: [],
  news:[],
  allUsers: [],
  users: [],
  userDetail: {},
  currentUser: null,
  favorites:[],
  readed:[],
};


function rootReducer(state = initialState, action) {
  let allBooks = state.allBooks;
  let sortedBooks = state.books;
  let filteredBooks = state.books;

  let allUsers = state.allUsers;
  let sortedUsers = state.users;
  let filteredUsers = state.users;
  
  switch (action.type) {
    // ------------------- BOOK CRUD ------------------------------------

    case "GET_BOOKS":
      return {
        ...state,
        allBooks: action.payload,
        books: action.payload,
      };

    case "GET_BOOK_BY_TITLE":
      return {
        ...state,
        books: action.payload,
      };

    case "GET_BOOK_BY_ID":
      return {
        ...state,
        bookDetail: action.payload,
      };
    
    // ------------------- BOOK CUSTOM GETS ------------------------------------

    case "GET_TRENDING_BOOKS":
      return {
        ...state,
        trending: action.payload,
      };

    case "GET_NEW_BOOKS":
      return {
        ...state,
        news: action.payload,
      };

    case "GET_RECOMENDED_BOOKS":
      return {
        ...state,
        recomended: action.payload,
      };

    case "CLEAN_BOOK_DETAIL":
      return {
        ...state,
        detail: {},
      };

    // ------------------- BOOK SORTS AND FILTERS ------------------------------------

    case "FILTER_BOOKS_BY_GENRE":
      filteredBooks = allBooks.filter(b => b.genre.name.toLowerCase() === action.payload.toLowerCase());
      return {
        ...state,
        books: filteredBooks
      }

    case "FILTER_BOOKS_BY_STATUS":
      if (action.payload.toLowerCase() === "active") {
        filteredBooks = allBooks.filter(b => b.active);
      } 
      else {
        filteredBooks = allBooks.filter(b => !b.active);
      }
      return {
        ...state,
        books: filteredBooks
      }
    
    case "SORT_BOOKS_BY_TITLE":
      sortedBooks = action.payload === "Ascending" ? 
      state.books.sort((a, b) => {
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      }) :
      state.books.sort((a, b) => {
        if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        books: sortedBooks
      };   

    case "SORT_BOOKS_BY_PUBLISHED_DATE":
      sortedBooks = action.payload === "Oldest" ? 
      state.books.sort((a, b) => {
        if(a.publishedDate.toLowerCase() > b.publishedDate.toLowerCase()) return 1;
        if(a.publishedDate.toLowerCase() < b.publishedDate.toLowerCase()) return -1;
        return 0;
      }) :
      state.books.sort((a, b) => {
        if(a.publishedDate.toLowerCase() < b.publishedDate.toLowerCase()) return 1;
        if(a.publishedDate.toLowerCase() > b.publishedDate.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        books: sortedBooks
      };

    // ------------------- AUTHORS & GENRES ------------------------------------

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_AUTHORS":
      return {
        ...state,
        authors: action.payload,
      }; 

    // ---------------------------- USER -----------------------------------------

    case "GET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    
    case "GET_USER_BY_ID":
      return {
        ...state,
        userDetail: action.payload,
      };

    case "GET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "CLEAN_USER_DETAIL":
      return {
        ...state,
        userDetail: {},
      };

    case "FILTER_USERS_BY_STATUS":
      if (action.payload.toLowerCase() === "active") {
        filteredUsers = allUsers.filter(u => u.active);
      } 
      else {
        filteredUsers = allUsers.filter(u => !u.active);
      }
      return {
        ...state,
        books: filteredUsers
      }

    case "SORT_USERS_BY_NAME":
      sortedUsers = action.payload === "Ascending" ? 
      state.users.sort((a, b) => {
        if(a.userName.toLowerCase() > b.userName.toLowerCase()) return 1;
        if(a.userName.toLowerCase() < b.userName.toLowerCase()) return -1;
        return 0;
      }) :
      state.users.sort((a, b) => {
        if(a.userName.toLowerCase() < b.userName.toLowerCase()) return 1;
        if(a.userName.toLowerCase() > b.userName.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        users: sortedUsers
      };

    // ------------------- OTHER MODELS ------------------------------------
    
    case "ADD_FAVORITE":
      
      return {
        ...state,
        favorites:[...state.favorites,action.payload]
      }

    case "DELETE_FAVORITE":
      const allFavorites=state.favorites;
      const filterDeleteFavorite=allFavorites.filter((el)=>el.userId !== action.payload);
      return{
        ...state,
        favorites:[filterDeleteFavorite]
      }
    
    case "ADD_READED":
      return {
        ...state,
        readed:[...state.readed,action.payload]
      }

    case "DELETE_READED":
      const allReaded=state.readed;
      const filterDeleteReaded=allReaded.filter((el)=>el.userId !== action.payload);
      return{
        ...state,
        readed:[filterDeleteReaded]
      }

    case "ADD_READING":
      return {
        ...state,
        readed:[...state.readed,action.payload]
      }
  
    case "DELETE_READING":
      const allReading=state.reading;
      const filterDeleteReading=allReading.filter((el)=>el.userId !== action.payload);
      return{
        ...state,
        reading:[filterDeleteReading]
      }

    default:
      return state;
  }
}

   

   


export default rootReducer;
