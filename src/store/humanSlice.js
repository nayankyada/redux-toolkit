import { createSlice, nanoid } from '@reduxjs/toolkit';
import { taskSlice } from './taskSlice';

const createHuman = (name) => ({
  id: nanoid(),
  name,
  taskIds: []
});
const initialState = [createHuman('Nayan'), createHuman('Harsh')];

// taskSlice return all actions that we have defined in reducer
export const humanSlice = createSlice({
  name: 'humans',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action);
      state.push(createHuman(action.payload.name));
    }
  },
  // here we listen assignToUser action of task slice
  // so when we assign human to task we also need to add human id into its own array
  extraReducers: (builder) => {
    builder.addCase(taskSlice.actions.assignToUser, (state, action) => {
      for (const human of state) {
        if (human.id === action.payload.humanId) {
          human.taskIds.push(action.payload.taskId);
        } else {
            human.taskIds = human.taskIds.filter(id => id !== action.payload.taskId)
        }
      }
    });
  }
});

// note related to -> extraReducers
// 1. here we can add multiple case by chaining addCase like in primis then().then().....
// 2. it mostly used to listen other reducer actions and based on that we write own logic
