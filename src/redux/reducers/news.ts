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
        case 'MY_NEWS_LIST_ITEM_IS_DELETED': {
            const newsId = state.my.list?.findIndex(({id}) => id === action.id);
            const newNewsList = newsId !== undefined && state.my.list 
            ? [state.my.list.slice(0, newsId), state.my.list.slice(newsId + 1)].flat() 
            : state.my.list;
            return{
                ...state,
                my: {
                    ...state.my,
                    list: newNewsList ? newNewsList.length > 0 ? newNewsList : null : null
                }
            }
        }
        case 'MY_NEWS_LIST_ITEM_IS_ADDED':
            const newNewsList = state.my.list 
            ? [action.newNewsItem, ...state.my.list.slice(0)] 
            : [action.newNewsItem];
            return{
                ...state,
                my: {
                    ...state.my,
                    error: null,
                    list: newNewsList
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
            case 'FAVOURITES_NEWS_LIST_ITEM_IS_DELETED': {
                const newsId = state.my.list?.findIndex(({id}) => id === action.id);
                const newNewsList = newsId !== undefined && state.my.list 
                ? [state.my.list.slice(0, newsId), state.my.list.slice(newsId + 1)].flat() 
                : state.my.list;
                return{
                    ...state,
                    my: {
                        ...state.my,
                        list: newNewsList ? newNewsList.length > 0 ? newNewsList : null : null
                    }
                }
            }
            case 'FAVOURITES_NEWS_LIST_ITEM_IS_ADDED': {
                const newNewsList = state.my.list 
                ? [action.newNewsItem, ...state.my.list.slice(0)] 
                : [action.newNewsItem];
                return{
                    ...state,
                    my: {
                        ...state.my,
                        error: null,
                        list: newNewsList
                    }
                }
            }
        default: return {...state};
    }
}

export default reducer;