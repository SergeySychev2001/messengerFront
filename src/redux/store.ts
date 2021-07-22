import { applyMiddleware, createStore, Store } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducers} from "./reducers";

const store: Store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;