import { 
    fetchUser, 
    userIsLoaded,
    userAvatarIsFetch
} from '../redux/actions/user';
import { 
    fetchSearchList, 
    fetchSubscribtionsList, 
    subscribtionsListIsLoaded 
} from '../redux/actions/subscriptions';
import { 
    fetchMyNewsList, 
    fetchSubscribtionsNewsList, 
    fetchFavouritesNewsList, 
    myNewsListItemIsDeleted,
    myNewsListItemIsAdded,
    myNewsListIsLoaded,
    subscribtionsNewsListIsLoaded,
    favouritesNewsListIsLoaded
} from '../redux/actions/news';
import {
    notificationsListItemIsDeleted,
    notificationsListItemIsAdded
} from '../redux/actions/notifications';
import { socketIsConnected, socketIsDisconnected } from '../redux/actions/socket';
import { fetchMessages } from '../redux/actions/messages';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        fetchUser,
        userIsLoaded, 
        userAvatarIsFetch,
        fetchSearchList, 
        fetchSubscribtionsList,
        subscribtionsListIsLoaded,
        fetchMyNewsList,
        fetchSubscribtionsNewsList,
        fetchFavouritesNewsList,
        myNewsListItemIsDeleted,
        myNewsListItemIsAdded,
        myNewsListIsLoaded,
        subscribtionsNewsListIsLoaded,
        favouritesNewsListIsLoaded,
        notificationsListItemIsDeleted,
        notificationsListItemIsAdded,
        socketIsConnected,
        socketIsDisconnected,
        fetchMessages
    }, dispatch);
}
