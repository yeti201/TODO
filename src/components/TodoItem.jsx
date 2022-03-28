import axios from "axios"
import React, { useEffect, useState } from "react"
import "./Todo.css" 

export const Todoitem = ({ data, getItem }) => {
  const [status, setStatus] = useState(data.status)
  function changeStatus() {
    console.log("hello")
    axios
      .patch(`http://localhost:3004/todos/${data.id}`, {
        status: status ? false : true,
      })
      .then(({ data }) => {
        console.log(data)
      })
  }
  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.deadline}</td>
      <td>
        <button className="toggle"
          onClick={() => {
            status ? setStatus(false) : setStatus(true)
            changeStatus()
          }}
        >
          {status ? "Completed" : "Incomplete"}
        </button>
      </td>
      <td>
        <button 
          onClick={() => {
            axios
              .delete(
                `http://localhost:3004/todos/${data.id}`
              )
              .then(({ data }) => {
                getItem()
                console.log(data, "Deleted")
              })
          }}
        >
          X
        </button>
      </td>
    </tr>
  )
}
