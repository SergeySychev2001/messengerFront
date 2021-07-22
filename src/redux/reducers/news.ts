import { NewsStateType, ActionType} from '../types/news';

const initialState: NewsStateType = {
    my: {
        list: null,
        isLoading: false,
        error: null
    },
    subscribtions: {
        list: null,
        isLoading: false,
        error: null
    },
    favourites: {
        list: null,
        isLoading: false,
        error: null
    }
}

const reducer = (state = initialState, action: ActionType): NewsStateType => {
    switch(action.type){
        case 'MY_NEWS_LIST_IS_FETCH':
            return{
                ...state,
                my: {
                    list: null,
                    isLoading: true,
                    error: null
                }
            };
        case 'MY_NEWS_LIST_IS_LOADED':
            return{
                ...state,
                my: {
                    list: action.payload,
                    isLoading: false,
                    error: null
                }
            }
        case 'MY_NEWS_LIST_IS_FAILED':
            return{
                ...state,
                my: {
                    list: null,
                    isLoading: false,
                    error: action.error
                }
            }
        case 'SUBSCRIBTIONS_NEWS_LIST_IS_FETCH':
            return{
                ...state,
                subscribtions: {
                    list: null,
                    isLoading: true,
                    error: null
                }
            };
        case 'SUBSCRIBTIONS_NEWS_LIST_IS_LOADED':
            return{
                ...state,
                subscribtions: {
                    list: action.payload,
                    isLoading: false,
                    error: null
                }
            }
        case 'SUBSCRIBTIONS_NEWS_LIST_IS_FAILED':
            return{
                ...state,
                subscribtions: {
                    list: null,
                    isLoading: false,
                    error: action.error
                }
            }
        case 'FAVOURITES_NEWS_LIST_IS_FETCH':
            return{
                ...state,
                favourites: {
                    list: null,
                    isLoading: true,
                    error: null
                }
            };
        case 'FAVOURITES_NEWS_LIST_IS_LOADED':
            return{
                ...state,
                favourites: {
                    list: action.payload,
                    isLoading: false,
                    error: null
                }
            }
        case 'FAVOURITES_NEWS_LIST_IS_FAILED':
            return{
                ...state,
                favourites: {
                    list: null,
                    isLoading: false,
                    error: action.error
                }
            }
        default: return {...state};
    }
}

export default reducer;