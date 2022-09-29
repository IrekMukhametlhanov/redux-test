import { useState, useEffect, } from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import { InputField } from './components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos} from './store/todoSlice';


function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.toDos);
  const addTask = () =>{
    dispatch(addNewTodo(text));
    setText('');
  }
  
useEffect(()=>{
 dispatch(fetchTodos());
},[dispatch])
  

  return (
    <div className="App">
      <InputField setText={setText} text={text} addTodo={addTask}/>
      {status === 'loading'  && <h2>loading</h2>}
      {error && <h2> error:{error}</h2>}

      <TodoList />
    </div>
  );
}

export default App;
