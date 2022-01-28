import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user';
import layoutSlice from './layout';
import testSlice from './test'


const rootReducer = combineReducers({
    user: userSlice,
    layout: layoutSlice,
    test: testSlice
});

export default rootReducer;