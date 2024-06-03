import {configureStore , createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState : {user:''},
    reducers:{
        login :(state , action)=>{
            state.user = action.payload.user
        },
        logout:(state )=>{
            state.user = ""
        }
    }
})
export const {login , logout}=userSlice.actions
export const store = configureStore({reducer:
    {
        user : userSlice.reducer
    }
})