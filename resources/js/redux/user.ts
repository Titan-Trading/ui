import { createSlice } from '@reduxjs/toolkit'; 
import { isEmpty } from 'ramda';

const initialState = localStorage.getItem('user') || null; //change to localStorage in the future
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (slice, action) => {
            if (isEmpty(action.payload)) {
                localStorage.removeItem('user');
            } else {
                localStorage.setItem('user', JSON.stringify(action.payload))
            }

            return null;
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;