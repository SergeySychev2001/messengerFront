import { 
    fetchUser, 
    userIsLoaded,
    userAvatarIsUpdated
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
import { fetchMessages, userIsSelected, messageIsAdded, myMessageIsAdded } from '../redux/actions/messages';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        fetchUser,
        userIsLoaded,
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
        fetchMessages,
        userIsSelected,
        userAvatarIsUpdated,
        messageIsAdded,
        myMessageIsAdded
    }, dispatch);
}
