import React from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';


export const TodoList = () => {
  const toDos = useSelector(state => state.toDos.toDos);
  return (
    <ul>
       {
        toDos.map(todo => <TodoItem key={todo.id}  title={todo.title}
            {...todo} 
          />)
       }

    </ul>
  )
}
