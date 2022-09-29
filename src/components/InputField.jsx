import React from 'react'

export const InputField = ({setText, text, addTodo}) => {
  return (
    <label>
    <input value={text} onChange={(e)=>setText(e.target.value)} />
    <button onClick={addTodo}>add todo</button>
    </label>
    
  )
}
