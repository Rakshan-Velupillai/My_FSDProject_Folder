import axios from "axios"

const api = "http://localhost:8080/api/patient"
const selectApi = "http://localhost:8080/api/patient/insurance-plan/select"
const planApi = "http://localhost:8080/api/patient/insurance-plans"

export const fetchAvailablePlans = () => {
    return async (dispatch) => {
        try {
            const config = {
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            }
            const response = await axios.get(planApi, config)
            dispatch({ type: 'SET_PLANS_LIST', payload: response.data })
        } catch (err) {
            console.error("Failed to load plans list from database", err)
        }
    }
}

export const fetchPatientStatus = () => {
    return async (dispatch) => {
        try {
            const config = {
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            }

            const response = await axios.get(`${api}/getPatient`, config)
            dispatch({
                type:'SET_PROFILE_DETAILS',
                payload:response.data
            })
            console.log(response.data)

            if (response.data?.insurancePlanCount > 0) {
                dispatch({ type:'SET_PATIENT_STATUS',
                     payload:'ACTIVE' })
            }
            else if (response.data?.address) {
                dispatch({ type:'SET_PATIENT_STATUS',
                     payload:'PROFILE_PENDING' })
            }
            else {
                dispatch({ type:'SET_PATIENT_STATUS', payload:'REGISTERED' })
            }
        } catch (err) {
            console.log(err)
            dispatch({ type:'SET_PATIENT_STATUS',
                 payload:'REGISTERED' })
        }
    }
}

export const saveProfile = (profileForm) => {
    return async (dispatch) => {
        const config = {
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        }
        await axios.post(`${api}/profile`, profileForm, config)
        dispatch({ type: 'SET_PATIENT_STATUS', payload: 'PROFILE_PENDING' })
        dispatch(fetchPatientStatus())
    }
}

export const selectInsurancePlan = (planForm) => {
    return async (dispatch) => {
        const config = {
            headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        }
        await axios.post(selectApi, planForm, config)
        dispatch({ type: 'SET_PATIENT_STATUS', payload: 'ACTIVE' })
        dispatch(fetchPatientStatus())
    }
}