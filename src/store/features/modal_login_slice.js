import { createSlice } from '@reduxjs/toolkit'

export const modalLogin = createSlice({
    name: 'modal-login',
    initialState: {
        is_show: false,
        username: '',
        password: ''
    },
    reducers: {
        showModalLogin: (state, action) => {
            state.is_show = true;
        },
        hideModalLogin: (state, action) => {
            state.is_show = false;
        },
        updateUsername: (state, action) => {
            state.username = action.payload;
        },        
        updatePassword: (state, action) => {
            state.password = action.payload;
        }

    },
})

export const { showModalLogin, hideModalLogin, updateUsername, updatePassword } = modalLogin.actions

export default modalLogin.reducer