import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  'toDos/fetchTodos',
  async function (_, {rejectWithValue}) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if(!response.ok) {
        throw new Error('server error!')
      }
      const data = await response.json();
      return data;
     
    } catch (error) {
         return rejectWithValue(error.message);
    }

  }
);
export const deleteToDo = createAsyncThunk(
  'toDos/deleteToDo',
  async function(id,{rejectWithValue, dispatch}){
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        method: 'DELETE', 
      })
      if(!response.ok){
        throw new Error('error')
      }
      dispatch(removeTodo({id}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const toggleStatus = createAsyncThunk(

    'toDos/toggleStatus',
    async function(id,{rejectWithValue, dispatch, getState}){
      const todo = getState().toDos.toDos.find((todo => todo.id === id ));
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
          method: 'PATCH', 
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          })       
        });
        if(!response.ok){
          throw new Error('toggle error');
        }
        dispatch(toggleTodoCompleted({id}));
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
);

export const addNewTodo = createAsyncThunk(
  'toDos/addNewTodo',
  async function(text,{rejectWithValue, dispatch}){
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`,{
           method: 'POST',
           headers: {
            'Content-type':'appclication/json'
           },
           body: JSON.stringify(todo)
      })
      if(!response.ok){
        throw new Error('error');
      }
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const setError =(state, action) => {
  state.status = 'rejected';
  state.Error = action.payload;
}

const todoSlice = createSlice({
  name: 'toDos',
  initialState: {
    toDos: [],
    status: null,
    error: null,

  },
  reducers: {
    addTodo(state, action) {
      state.toDos.push(action.payload);
    },
    toggleTodoCompleted(state, action) {
      const togleTodo = state.toDos.find(todo => todo.id === action.payload.id);
      togleTodo.completed = !togleTodo.completed;
    },
    removeTodo(state, action) {
      state.toDos = state.toDos.filter(todo => todo.id !== action.payload.id)
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.toDos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteToDo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  }
});
export const {
  addTodo,
  toggleTodoCompleted,
  removeTodo
} = todoSlice.actions;

export default todoSlice.reducer;