import { combineReducers } from 'redux';
import { cardReducer } from "./card";
import { modalReducer } from './modal'

export const rootReducer = combineReducers({
    card: cardReducer,
    modal: modalReducer
});
