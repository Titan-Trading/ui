import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showLoader: false,
    error: null,
    success: null,
    title: ''
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        showLoading: (slice) => {
            slice.showLoader = true;
        },
        hideLoading: (slice) => {
            slice.showLoader = false;
        },
        setSuccess: (slice, action) => {
            slice.success = action.payload
        },
        setError: (slice, action) => {
            slice.error = action.payload;
        },
        setTitle: (slice, action) => {
            slice.title = action.payload;
        }
    }
});

export const { showLoading, hideLoading, setSuccess, setError, setTitle } = layoutSlice.actions;
export default layoutSlice.reducer;