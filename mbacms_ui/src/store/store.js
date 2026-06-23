import { configureStore } from "@reduxjs/toolkit";
import { patientReducer } from "./reducer/patientReducer"

export const store = configureStore({
    reducer: {
        patient: patientReducer,
    }
})