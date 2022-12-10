const initialState={
    books:[],
    allBooks:[],
    authors:[],
    genres:[],
    detail:[],
    trending:[]
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case 'GET_BOOKS':
        return{
            ...state,
            allBooks:action.payload,
            books:action.payload
        }

        case 'GET_GENRES':
        return{
            ...state,
            types:action.payload
        }

        case 'FILTER_BY_GENRE':
        const allBooks=state.allBooks
        const genreFiltered=action.payload==='all'? allBooks :
        allBooks.filter((el)=>el.genre.includes(action.payload))
        
        return{
         ...state,
         books:genreFiltered
         }

         case 'SORT_BY_TITLE':
        let sortTitle=action.payload==='asc'?
        state.books.sort(function (a,b){
            if(a.title>b.title){
                return 1;
            }
            if(b.title>a.title){
                return -1;
            }
            return 0;
        }) :
        state.books.sort(function(a,b){
            if(a.title>b.title){
                return -1;
            }
            if(b.title>a.title){
                return 1;
            }
            return 0;
        })
        return{
            ...state,
            books:sortTitle
        }

        case 'SORT_BY_PUBLISHER_DATE':
    let sortPublisher=action.payload==='asc'?
        state.books.sort(function (a,b){
            if(a.publisherDate>b.publishedDate){
                return 1;
            }
            if(b.publishedDate>a.publishedDate){
                return -1;
            }
            return 0;
        }) :
        state.books.sort(function(a,b){
            if(a.publishedDate>b.publishedDate){
                return -1;
            }
            if(b.publishedDate>a.publishedDate){
                return 1;
            }
            return 0;
        })
        return{
            ...state,
            books:sortPublisher
        }
        case 'GET_TRENDING_BOOKS':
            console.log("ALLBOOKS",state.books)

            const allBooksTrending=state.books
            console.log("allBooksTrending",allBooksTrending)
            const sortByTrendings=allBooksTrending.sort(function (a,b){

                if(b.averageRating>a.averageRating){
                  return 1;
              }
              if(a.averageRating>b.averageRating){
                  return -1;
              }
              return 0;
              })
              console.log("TRENDINGSORT",sortByTrendings)
          
              const trending=[]
          
              for(let i=0;i<10;i++){
                trending.push(sortByTrendings[i])
                console.log("TRENDINGS:", trending[i])
              }
              return{
                ...state,
                trending:trending
              }

        case 'GET_BY_TITLE':
        return{
            ...state,
            books:action.payload
        }

        case 'GET_BY_AUTHOR':
        return{
            ...state,
            books:action.payload
        }

        case 'POST_BOOK':
        return{
            ...state,
        }

        case 'GET_DETAILS':
            return{
                ...state,
                detail:action.payload
            }
        case 'CLEAN_DETAIL':
        return{
            ...state,
            detail:[]
        }

        case 'DELETE_BOOK_DB':
        const allBook3=state.books
        const filterDelete=allBook3.filter(el=>el.id!==action.payload)
        return{
            ...state,
            books:filterDelete

        }




        default:
            return state;
    }
}

export default rootReducer;