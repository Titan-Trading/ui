import { createSlice } from '@reduxjs/toolkit'; 
import { isEmpty } from 'ramda';

const initialState = {
    recentIndicators: [],
    recentStrategies: [],
    recentSignals: []
};

const labSlice = createSlice({
    name: 'lab',
    initialState,
    reducers: {
        setRecentIndicators: (slice, action) => {
            slice.recentIndicators = action.payload;
        },
        setRecentStrategies: (slice, action) => {
            slice.recentStrategies = action.payload;
        },
        setRecentSignals: (slice, action) => {
            slice.recentSignals = action.payload;
        },
    }
});

export const { setRecentIndicators, setRecentStrategies, setRecentSignals } = labSlice.actions;
export default labSlice.reducer;