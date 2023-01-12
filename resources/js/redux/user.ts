import { createSlice } from '@reduxjs/toolkit'; 
import { isEmpty } from 'ramda';
import jwt_decode from 'jwt-decode';

const userData = localStorage.getItem('user');
const initialState = userData ? JSON.parse(userData) : null; //change to localStorage in the future
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (slice, action) => {
            if (isEmpty(action.payload)) {
                localStorage.removeItem('user');

                return null;
            }

            const decoded = jwt_decode(action.payload.access_token);
            const user = {...action.payload, user: decoded};

            localStorage.setItem('user', JSON.stringify(user));
            return user;
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;