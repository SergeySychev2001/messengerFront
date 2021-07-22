import { fetchUser, userIsRemoved, userIsLoaded } from '../redux/actions/user';
import { fetchSearchList, fetchSubscribtionsList, subscribtionsListIsLoaded } from '../redux/actions/subscriptions';
import { fetchMyNewsList, fetchSubscribtionsNewsList, fetchFavouritesNewsList } from '../redux/actions/news';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        fetchUser, 
        userIsRemoved, 
        userIsLoaded, 
        fetchSearchList, 
        fetchSubscribtionsList,
        subscribtionsListIsLoaded,
        fetchMyNewsList,
        fetchSubscribtionsNewsList,
        fetchFavouritesNewsList
    }, dispatch);
}
