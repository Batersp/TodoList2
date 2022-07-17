import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setClearAC, SetClearACType} from "../TodolistsList/tasks-reducer";

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: action.payload.value}
        }
        default:
            return {...state}
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: SET_IS_LOGGED_IN,
        payload: {value}
    } as const
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setClearAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


export type InitialStateType = {
    isLoggedIn: boolean
}

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType


export type AuthActionsType = SetIsLoggedInACType | SetClearACType

