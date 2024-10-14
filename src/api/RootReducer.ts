import { combineReducers, Reducer } from '@reduxjs/toolkit';

const combineReducer = combineReducers<IState>({});

export default combineReducer;

export type IState = {
  [key: string]: Reducer;
};
