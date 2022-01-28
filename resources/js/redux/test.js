import { createSlice } from '@reduxjs/toolkit'; 
import { isEmpty } from 'ramda';

const initialState = 'Brandon'; //change to localStorage in the future
const testSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTest: (slice, action) => action.payload
    }
});

export const { setTest } = testSlice.actions;
export default testSlice.reducer;