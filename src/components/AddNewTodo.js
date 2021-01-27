import React, { useState, useEffect } from "react"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import { Paper, Grid } from "@material-ui/core"
// import Todo from "./Todo"
import TodoList from "./TodoList"
import { makeStyles } from "@material-ui/core/styles"
import "./main.css"
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
    display: "block",
    width: "40%",
    marginTop: "80px",
    margin: "auto",
    padding: "20px",
  },
  "@media (max-width:768px)": {
    root: {
      width: "80%",
      margin: "30px",
    },
  },
}))

const AddTodoForm = () => {
  const classes = useStyles()
  const [text, setText] = useState("")
  const [crud, setCrud] = useState([])

  let input
  const editTodo = async text => {
    text.archived = true

    setText(text.text)
    try {
      await fetch(`/api/updateCrud`, {
        method: "PUT",
        body: JSON.stringify(text),
      })
      // setCrud(crud)
    } catch (error) {
      console.log(error)
    }
  }

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
  useEffect(() => {
    LoadCrud()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (text === "") {
      alert("PLZ enter Value")
    } else {
      const body = text
      try {
        await fetch("/api/createCrud", {
          body: JSON.stringify(body),
          method: "POST",
        })

        resetForm()
        LoadCrud()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.main}>
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
      </form>
      {!crud.length ? (
        <h3
          style={{
            marginTop: "4rem",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          fetching data...
        </h3>
      ) : (
        <Paper className={classes.root}>
          <TodoList crud={crud} refreshCruds={LoadCrud} editTodo={editTodo} />
        </Paper>
      )}
    </>
  )
}

export default AddTodoForm
