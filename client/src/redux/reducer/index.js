const initialState={
    books:[],
    allBooks:[],
    genres:[],
    detail:[]
}

function rootReducer(state=initialState,action){
    switch(action.type){
        default:
            return state;
    }
}

export default rootReducer;