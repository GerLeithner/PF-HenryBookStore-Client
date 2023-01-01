const initialState = {
  books: [],
  allBooks: [],
  authors: [],
  genres: [],
  detail: [],
  trending: [],
  recomended: [],
  news:[],
  user: null,
  favorites:[],
  readed:[],
};


  
// console.log("FAVORITES:",state.favorites)
// console.log("READED:",state.readed)

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        allBooks: action.payload,
        books: action.payload,
      };

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

    case "FILTER_BY_GENRE":
      const allBooks = state.allBooks;
      const genreFiltered =
        action.payload === "all"
          ? allBooks
          : allBooks.filter((g) =>
              g.genres.find((a) => a.name === action.payload)
            );
      return {
        ...state,
        books: genreFiltered,
      };

    case "SORT_BY_TITLE":
      let sortTitle =
        action.payload === "asc"
          ? state.books.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.books.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        books: sortTitle,
      };

    case "SORT_BY_PUBLISHER_DATE":
      let sortPublisher =
        action.payload === "asc"
          ? state.books.sort(function (a, b) {
              if (a.publisherDate > b.publishedDate) {
                return 1;
              }
              if (b.publishedDate > a.publishedDate) {
                return -1;
              }
              return 0;
            })
          : state.books.sort(function (a, b) {
              if (a.publishedDate > b.publishedDate) {
                return -1;
              }
              if (b.publishedDate > a.publishedDate) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        books: sortPublisher,
      };
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

    case "GET_BY_TITLE":
      return {
        ...state,
        books: action.payload,
      };

    case "GET_BY_AUTHOR":
      return {
        ...state,
        books: action.payload,
      };

    case "POST_BOOK":
      return {
        ...state,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: [],
      };

    case "DELETE_BOOK_DB":
      const allBook3 = state.books;
      const filterDelete = allBook3.filter((el) => el.id !== action.payload);
      return {
        ...state,
        books: filterDelete,
      };

    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    
    case "ADD_FAVORITE":
     
      return {
        ...state,
        favorites:[...state.favorites,action.payload]
      }
    case "DELETE_FAVORITE":
      const allFavorites=state.favorites;

      const filterDeleteFavorite=allFavorites.filter((el)=>el.id !== action.payload.id);
      

      return{
        ...state,
        favorites:filterDeleteFavorite
      }
    
    case "ADD_READED":
      
      return {
        ...state,
        readed:[...state.readed,action.payload]
      }

    case "DELETE_READED":
      const allReaded=state.readed;

      const filterDeleteReaded=allReaded.filter((el)=>el.id !== action.payload.id);
      

      return{
        ...state,
        readed:filterDeleteReaded
      }

      case "ADD_READING":
        return {
          ...state,
          readed:[...state.readed,action.payload]
        }
  
      case "DELETE_READING":
        const allReading=state.reading;

        const filterDeleteReading=allReading.filter((el)=>el.id !== action.payload.id);
        return{
          ...state,
          reading:filterDeleteReading

        
        }

    default:
      return state;
  }
}

   

   


export default rootReducer;
