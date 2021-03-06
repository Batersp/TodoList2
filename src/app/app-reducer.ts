import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";

const SET_INITIALIZED = 'SET_INITIALIZED'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case SET_INITIALIZED: {
            return {...state, isInitialized: action.payload.value}
        }
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (value: boolean) => {
    return {
        type: SET_INITIALIZED,
        payload: {value}
    } as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
        .finally(() => dispatch(setInitializedAC(true)))
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedACType = ReturnType<typeof setInitializedAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedACType
