import React from "react"

const TodoList = ({ crud }) => {
  return <div>{crud && crud.map(text => text.text)}</div>
}

export default TodoList
