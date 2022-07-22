import Cookie from 'js-cookie'; 
import { createSlice } from '@reduxjs/toolkit'

export const containerTasksSlice = createSlice({
    name: 'tasks-container',
    initialState: {
        is_logged: Cookie.get('token') ? true: false,
        status: 'idle',
        error: null,
        filtering: {
            by: 'id',
            asc: true
        },
        tasks: [],
        pages: {
            prev: null,
            start: null,
            next: null,
            last: null,
            current: 1
        }
    },
    reducers: {
        setFilterBy: (state, action) => {
            state.filtering.by = action.payload;
            state.status = 'idle'
        },
        changeAscDesc: (state, action) => {
            state.filtering.asc = !state.filtering.asc;
            state.status = 'idle';
        },
        updateTasksContainer: (state, action) => {
            state.status = 'success';
            state.error = null;
            state.tasks = action.payload.tasks;
            state.pages = action.payload.pages;
        },
        dropTasksContainer: (state, action) => {
            state.status = 'idle';
            state.error = null;
        },
        failedTasksContainer: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
        goToStartPage: (state, action) => {
            state.status = 'idle'
            state.pages.current = state.pages.start;
        },
        goToPrevPage: (state, action) => {
            state.status = 'idle'
            state.pages.current = state.pages.prev;
        },
        goToNextPage: (state, action) => {
            state.status = 'idle'
            state.pages.current = state.pages.next;
        },
        goToLastPage: (state, action) => {
            state.status = 'idle'
            state.pages.current = state.pages.last;
        },
        updateLoggedUser: (state, action) => {
            state.is_logged = action.payload.is_logged;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateTasksContainer, dropTasksContainer, failedTasksContainer, 
    goToStartPage, goToPrevPage, goToNextPage, goToLastPage, setFilterBy, changeAscDesc, updateLoggedUser } = containerTasksSlice.actions

export default containerTasksSlice.reducer