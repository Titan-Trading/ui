import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user';
import layoutSlice from './layout';


const rootReducer = combineReducers({
    user: userSlice,
    layout: layoutSlice
});

export default rootReducer;