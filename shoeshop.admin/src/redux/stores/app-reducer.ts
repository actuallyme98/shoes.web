import { createTypeReducer, isError } from '../type-redux';
import * as AppActions from '../actions/app-action';

export const initialState = {
  isMobile: false,
};

export const reducer = createTypeReducer(initialState);
