import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './user';
import layoutSlice from './layout';
import labSlice from './lab';

const rootReducer = combineReducers({
    user: userSlice,
    layout: layoutSlice,
    lab: labSlice
});

export default rootReducer;