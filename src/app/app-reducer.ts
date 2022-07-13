export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.payload.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.message}
        }
        default:
            return state
    }
}

export type AppActionsType = SetAppStatusACType
    | SetAppErrorACType

type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {status}
    } as const
}

export const setAppErrorAC = (message: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {message}
    } as const
}