import { configureStore } from '@reduxjs/toolkit'
import containerTasksSlice from './features/container_tasks_slice'
import modalEditTask from './features/modal_edit_slice'
import modalLogin from './features/modal_login_slice'
import addTaskForm from './features/add_task_slice'


export default configureStore({
  reducer: {
    containerTasks: containerTasksSlice,
    modalEditTask: modalEditTask,
    modalLogin: modalLogin,
    addTaskForm: addTaskForm
  },
})