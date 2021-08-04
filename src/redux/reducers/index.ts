import { combineReducers } from "redux";
import user from './user';
import subscriptions from './subcribtions';
import news from './news';
import notifications from './notifications';
import socket from './socket';
import messages from './messages';

export const reducers = combineReducers({user, subscriptions, news, notifications, socket, messages});

export type RootState = ReturnType<typeof reducers>;