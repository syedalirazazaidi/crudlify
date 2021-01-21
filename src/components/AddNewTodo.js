import React, { useState, useEffect } from "react"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import { Paper, Grid } from "@material-ui/core"
// import Todo from "./Todo"
import TodoList from "./TodoList"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flexWrap: "wrap",

    marginTop: "80px",
    width: "60%",
    margin: "auto",
    padding: "20px",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "40%",
    marginTop: "80px",
    margin: "auto",
    padding: "20px",
  },
}))

const AddTodoForm = () => {
  const classes = useStyles()
  const [text, setText] = useState("")
  const [crud, setCrud] = useState([])

  const resetForm = () => {
    setText("")
  }
  const LoadCrud = async () => {
    try {
      const res = await fetch("/api/getCrud")
      const cruds = await res.json()
      setCrud(cruds)
    } catch (err) {
      console.log(err)
    }
  }
  const addTodo = data => {
    return fetch("/api/createCrud", {
      body: JSON.stringify(data),
      method: "POST",
    }).then(response => {
      console.log(response, "RESP(((")
      return response.json()
    })
  }
  useEffect(() => {
    LoadCrud()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const body = { text }
    addTodo(body)
      .then(response => {
        console.log("API response", response)
        resetForm()
      })

      .catch(error => {
        console.log("API error", error)
      })
  }

  return (
    <>
      <Paper className={classes.main}>
        <form onSubmit={handleSubmit}></form>
        <Input
          placeholder="Todo"
          value={text}
          inputProps={{
            "aria-label": "Description",
          }}
          onChange={e => setText(e.target.value)}
          style={{
            width: "40%",
            marginLeft: "20%",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%", height: "7%" }}
        >
          Add
        </Button>
      </Paper>

      <Paper className={classes.root}>
        {/* <Grid container>{crud.map(text => text.text)}</Grid> */}
        <TodoList crud={crud} />
      </Paper>
    </>
  )
}

export default AddTodoForm
