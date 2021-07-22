import { UserType, ActionType} from '../types/user';

const initialState: UserType = {
    id: null,
    name: null,
    surname: null,
    avatar: false,
    city: null,
    day: null,
    month: null,
    year: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action: ActionType): UserType => {
    switch(action.type){
        case 'USER_IS_FETCH':
            return {
                ...state,
                ...action.payload
            };
        case 'USER_IS_LOADED':
            return {
                ...state,
                ...action.payload
            };
        case 'USER_IS_REMOVED':
            return {
                ...state,
                ...action.payload
            };
        case 'USER_IS_FAILED':
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        default: return {...state};
    }
}

export default reducer;
