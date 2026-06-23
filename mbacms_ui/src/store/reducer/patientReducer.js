const initialState = {
    onboardingStatus: "REGISTERED",
    availablePlans: [],
    profileDetails: null
}

export const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PATIENT_STATUS':
            return {
                ...state,
                onboardingStatus: action.payload
            }
        case 'SET_PLANS_LIST':
            return {
                ...state,
                availablePlans: action.payload
            }
        case 'SET_PROFILE_DETAILS':
            return {
                ...state,
                profileDetails: action.payload
            }
        default:
            return state
    }
}

