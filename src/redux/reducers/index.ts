import { combineReducers } from "redux";
import user from './user';
import subscriptions from './subcribtions';
import news from './news';

export const reducers = combineReducers({user, subscriptions, news});

export type RootState = ReturnType<typeof reducers>;