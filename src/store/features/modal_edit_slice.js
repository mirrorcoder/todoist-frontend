import { createSlice } from '@reduxjs/toolkit'

export const modalEditTask = createSlice({
    name: 'modal-edit-task',
    initialState: {
        is_show: false,
        task_id: null,
        is_done: false,
        desc_task: ''
    },
    reducers: {
        showModalEditTask: (state, action) => {
            state.is_show = true;
            state.task_id = action.payload.id;
            state.desc_task = action.payload.desc_task;
            state.is_done = action.payload.is_done;
        },
        hideModalEditTask: (state, action) => {
            state.is_show = false;
        },
        updateTask: (state, action) => {
            const {is_done, desc_task} = action.payload;
            if (is_done !== undefined) state.is_done = action.payload.is_done;            
            if (desc_task !== undefined) state.desc_task = action.payload.desc_task;
        }
    },
})

export const { showModalEditTask, hideModalEditTask, updateTask } = modalEditTask.actions

export default modalEditTask.reducer