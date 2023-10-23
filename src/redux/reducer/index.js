const initialState = {
  books: [],
  allBooks: [],
  authors: [],
  genres: [],
  bookDetail: {},
  trending: [],
  recommended: [],
  news: [],
  allUsers: [],
  users: [],
  userDetail: {},
  currentUser: null,
  filters: [],
  search: "",
  modal: false,
  edit: false,
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
        filters: [],
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

    case "CLEAN_BOOK_DETAIL":
      return {
        ...state,
        bookDetail: {},
      };

    case "TURN_ON_MODAL":
      return {
        ...state,
        modal: true,
      };

    case "TURN_OFF_MODAL":
      return {
        ...state,
        modal: false,
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

    case "GET_RECOMMENDED_BOOKS":
      return {
        ...state,
        recommended: action.payload,
      };

    // ------------------- BOOK SORTS AND FILTERS ------------------------------------

    case "FILTER_BOOKS_BY_GENRE":
      if (sortedBooks.length) {
        filteredBooks = sortedBooks.filter(
          (b) => b.genre.name.toLowerCase() === action.payload.toLowerCase()
        );
      } else {
        filteredBooks = allBooks.filter(
          (b) => b.genre.name.toLowerCase() === action.payload.toLowerCase()
        );
      }

      let includesGenre = false;

      state.filters.forEach((filter) => {
        if (filter.includes("Genre-")) includesGenre = true;
      });
      if (!includesGenre) {
        return {
          ...state,
          books: filteredBooks,
          filters: [...state.filters, "Genre-" + action.payload],
        };
      }

      return { ...state };

    case "FILTER_BOOKS_BY_LENGTH":
      if (sortedBooks.length) {
        if (action.payload === "Large") {
          filteredBooks = sortedBooks.filter((b) => b.pages > 200);
        } else if (action.payload === "Medium") {
          filteredBooks = sortedBooks.filter(
            (b) => b.pages > 100 && b.pages < 200
          );
        } else {
          filteredBooks = sortedBooks.filter((b) => b.pages < 100);
        }
      } else {
        if (action.payload === "Large") {
          filteredBooks = allBooks.filter((b) => b.pages > 200);
        } else if (action.payload === "Medium") {
          filteredBooks = allBooks.filter(
            (b) => b.pages > 100 && b.pages < 200
          );
        } else {
          filteredBooks = allBooks.filter((b) => b.pages < 100);
        }
      }

      let includesLength = false;

      state.filters.forEach((filter) => {
        if (filter.includes("Length-")) includesLength = true;
      });
      if (!includesLength) {
        return {
          ...state,
          books: filteredBooks,
          filters: [...state.filters, "Length-" + action.payload],
        };
      }

      return { ...state };

    case "DELETE_FILTER":
      return {};

    case "CLEAN_SORTED_BOOKS":
      return { ...state, sortedBooks: [], books: allBooks };

    case "FILTER_BY":
      console.log("REDUCER: ", action.filters);
      action.filters.forEach((filter) => {
        if (filter.includes("Genre")) {
          if (sortedBooks.length) {
            sortedBooks = sortedBooks.filter(
              (b) =>
                b.genre.name.toLowerCase() ===
                filter.substring(filter.indexOf("-") + 1).toLowerCase()
            );
          } else {
            sortedBooks = state.books.filter(
              (b) =>
                b.genre.name.toLowerCase() ===
                filter.substring(filter.indexOf("-") + 1).toLowerCase()
            );
          }
        } else {
          if (filter.includes("Length")) {
            if (sortedBooks.length) {
              if (filter.substring(filter.indexOf("-") + 1) === "Large") {
                sortedBooks = sortedBooks.filter((b) => b.pages > 200);
              } else if (
                filter.substring(filter.indexOf("-") + 1) === "Medium"
              ) {
                sortedBooks = sortedBooks.filter(
                  (b) => b.pages > 100 && b.pages < 200
                );
              } else {
                sortedBooks = sortedBooks.filter((b) => b.pages < 100);
              }
            } else {
              if (filter.substring(filter.indexOf("-") + 1) === "Large") {
                sortedBooks = state.books.filter((b) => b.pages > 200);
              } else if (
                filter.substring(filter.indexOf("-") + 1) === "Medium"
              ) {
                sortedBooks = state.books.filter(
                  (b) => b.pages > 100 && b.pages < 200
                );
              } else {
                sortedBooks = state.books.filter((b) => b.pages < 100);
              }
            }
          }
        }
      });

      return {
        ...state,
        books: sortedBooks,
      };

    case "FILTER_BOOKS_BY_STATUS":
      console.log("Entre al coso de sort by title");
      if (action.payload.toLowerCase() === "active") {
        filteredBooks = allBooks.filter((b) => b.active);
      } else {
        filteredBooks = allBooks.filter((b) => !b.active);
      }
      return {
        ...state,
        books: filteredBooks,
      };

    case "SORT_BOOKS_BY_TITLE":
      sortedBooks =
        action.payload === "Ascending"
          ? state.books.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              return 0;
            })
          : state.books.sort((a, b) => {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              return 0;
            });

      return {
        ...state,
        books: sortedBooks,
      };

    case "SORT_BOOKS_BY_PUBLISHED_DATE":
      sortedBooks =
        action.payload === "Oldest"
          ? state.books.sort((a, b) => {
              if (a.publishedDate.toLowerCase() > b.publishedDate.toLowerCase())
                return 1;
              if (a.publishedDate.toLowerCase() < b.publishedDate.toLowerCase())
                return -1;
              return 0;
            })
          : state.books.sort((a, b) => {
              if (a.publishedDate.toLowerCase() < b.publishedDate.toLowerCase())
                return 1;
              if (a.publishedDate.toLowerCase() > b.publishedDate.toLowerCase())
                return -1;
              return 0;
            });
      return {
        ...state,
        books: sortedBooks,
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
        users: action.payload,
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
        filteredUsers = allUsers.filter((u) => !u.banned);
      } else {
        filteredUsers = allUsers.filter((u) => u.banned);
      }
      return {
        ...state,
        users: filteredUsers,
      };

    case "FILTER_USERS_BY_SUBSCRIPTION":
      console.log("Subs:", action.payload);
      filteredUsers = allUsers.filter(
        (u) => u.subscription.plan === action.payload
      );

      return {
        ...state,
        users: filteredUsers,
      };
    case "SORT_USERS_BY_NAME":
      sortedUsers =
        action.payload === "Ascending"
          ? state.users.sort((a, b) => {
              if (a.userName.toLowerCase() > b.userName.toLowerCase()) return 1;
              if (a.userName.toLowerCase() < b.userName.toLowerCase())
                return -1;
              return 0;
            })
          : state.users.sort((a, b) => {
              if (a.userName.toLowerCase() < b.userName.toLowerCase()) return 1;
              if (a.userName.toLowerCase() > b.userName.toLowerCase())
                return -1;
              return 0;
            });
      return {
        ...state,
        users: sortedUsers,
      };

    // ------------------- OTHER MODELS ------------------------------------

    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "DELETE_FAVORITE":
      const allFavorites = state.favorites;
      const filterDeleteFavorite = allFavorites.filter(
        (el) => el.userId !== action.payload
      );
      return {
        ...state,
        favorites: [filterDeleteFavorite],
      };

    case "ADD_READED":
      return {
        ...state,
        readed: [...state.readed, action.payload],
      };

    case "DELETE_READED":
      const allReaded = state.readed;
      const filterDeleteReaded = allReaded.filter(
        (el) => el.userId !== action.payload
      );
      return {
        ...state,
        readed: [filterDeleteReaded],
      };

    case "SEARCH_INPUT":
      return { ...state, search: action.payload };

    case "EDIT_REVIEW":
      return {
        ...state,
        edit: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
