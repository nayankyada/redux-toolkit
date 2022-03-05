import { createAction, createSlice, nanoid } from '@reduxjs/toolkit';

const createTask = (title) => ({
  id: nanoid(),
  title,
  completed: false,
  assignedTo: ''
});

const initialState = [
  createTask('Order more energy drinks'),
  createTask('Water the plans')
];

// taskSlice return all actions that we have defined in reducer
// here redux toolkit use immer lib it mutate the object like this
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action);
      state.push(createTask(action.payload.taskName));
    },
    toggle: (state, action) => {
      const task = state.find((task) => task.id === action.payload.taskId);
      task.completed = action.payload.completed;
    },
    assignToUser: (state, action) => {
      const task = state.find((task) => task.id === action.payload.taskId);
      task.assignedTo = action.payload.humanId;
    }
  }
});

export const toggleTask = createAction('task/toggle', (taskId, completed) => ({
  payload: { taskId, completed }
}));
