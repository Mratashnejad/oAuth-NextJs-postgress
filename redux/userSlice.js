import {createSlice} from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'user',
    initialState : {
        user:''
    },
    reducers:{
        login :(state , action)=>{
            state.user = action.payload.user
        },
        logout:(state )=>{
            state.user = ""
        }
    }
})
export const {login , logout} = userSlice.actions
