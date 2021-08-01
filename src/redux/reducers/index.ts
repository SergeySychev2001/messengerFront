import { combineReducers } from "redux";
import user from './user';
import subscriptions from './subcribtions';
import news from './news';
import notifications from './notifications';

export const reducers = combineReducers({user, subscriptions, news, notifications});

export type RootState = ReturnType<typeof reducers>;