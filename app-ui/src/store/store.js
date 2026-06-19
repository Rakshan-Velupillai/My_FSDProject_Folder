import { configureStore } from "@reduxjs/toolkit"
import { pageReducer } from "./reducer/pageReducer"

export const store = configureStore({
    reducer: {
        page: pageReducer
    }
})