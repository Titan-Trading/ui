import { createSlice } from '@reduxjs/toolkit';

let initialState = {}; //change to localStorage in the future
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (slice, action) => action.payload
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;