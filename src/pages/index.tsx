import React, { useEffect, useState } from "react"
import AddTodoForm from "../components/AddNewTodo"
import "./style.css"
export default () => {
  const [status, setStatus] = useState("loading...")
  const [testimonials, setTestimonials] = useState(null)

  return (
    <>
      <AddTodoForm />
    </>
  )
}
