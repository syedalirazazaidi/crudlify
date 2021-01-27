import React from "react"
import { Delete, Build } from "@material-ui/icons"

import IconButton from "@material-ui/core/IconButton"
import "./main.css"
import { makeStyles } from "@material-ui/core/styles"

const TodoList = ({ crud, refreshCruds, editTodo }) => {
  // const editTodo = text => {
  //   console.log(text, "COOO")
  // }
  const deleteTodo = async text => {
    const id = text
    try {
      await fetch("/api/deleteCrud", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      })
      refreshCruds()
    } catch (error) {
      console.error("ERROR", error)
    }
  }
  return (
    <div>
      {crud &&
        crud.map(text => (
          <ul key={text._id}>
            <li
              style={{
                padding: "7px 5px",
                alignItems: "center",
                listStyle: "none",
                fontSize: "15px",
              }}
            >
              <div className="ecl">{text.text}</div>

              <div className="list-todo">
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={() => editTodo(text)}
                >
                  <Build fontSize="small" />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="Delete"
                  onClick={() => deleteTodo(text._id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </li>
          </ul>
        ))}
      <br />
    </div>
  )
}

export default TodoList
