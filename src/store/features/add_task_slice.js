import { createSlice } from '@reduxjs/toolkit'

export const addTaskForm = createSlice({
    name: 'modal-login',
    initialState: {
        validated: true,
        name: '',
        email: '',
        desc: ''
    },
    reducers: {
        setValidated: (state, action) => {
            state.validated = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },        
        setDesc: (state, action) => {
            state.desc = action.payload;
        }

    },
})

export const { setValidated, setName, setEmail, setDesc } = addTaskForm.actions

export default addTaskForm.reducer