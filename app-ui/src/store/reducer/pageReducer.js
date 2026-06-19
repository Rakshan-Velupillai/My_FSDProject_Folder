const initialState = {
    list: [],
    pageCount: 0
}

export const pageReducer=(state = initialState,action)=>{

    if (action.type==="GET_ALL") {
        return {
            ...state,
            list: action.payload.results,
            pageCount: action.payload.info.pages
        }
    }

    return state
}