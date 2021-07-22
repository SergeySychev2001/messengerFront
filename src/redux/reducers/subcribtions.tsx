import {SubscribtionsType, ActionType} from '../types/subscriptions';

const initialState: SubscribtionsType = {
    searchList: {
        list: null,
        isLoading: false,
        error: null
    },
    subscribtionsList: {
        list: null,
        isLoading: false,
        error: null
    }
}

const reducer = (state = initialState, action: ActionType): SubscribtionsType => {
    switch(action.type){
        case 'SEARCH_LIST_IS_FETCH':
            return{
                ...state,
                searchList: {
                    list: null,
                    isLoading: true,
                    error: null
                }
            }
        case 'SEARCH_LIST_IS_LOADED':
        return{
            ...state,
            searchList: {
                list: action.payload,
                isLoading: false,
                error: null
            }
        }
        case 'SEARCH_LIST_IS_FAILED':
        return{
            ...state,
            searchList: {
                list: null,
                isLoading: false,
                error: action.error
            }
        }
        case 'SUBSCRIBTIONS_LIST_IS_FETCH':
            return{
                ...state,
                subscribtionsList: {
                    list: null,
                    isLoading: true,
                    error: null
                }
            }
        case 'SUBSCRIBTIONS_LIST_IS_LOADED':
            return{
                ...state,
                subscribtionsList: {
                    list: action.payload,
                    isLoading: false,
                    error: null
                }
            }
        case 'SUBSCRIBTIONS_LIST_IS_FAILED':
            return{
                ...state,
                subscribtionsList: {
                    list: null,
                    isLoading: false,
                    error: action.error
                }
            }
        default: 
            return{
                ...state
            }
    }
}

export default reducer;