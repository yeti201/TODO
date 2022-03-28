import React, { useEffect, useState } from "react"
import "./Todo.css"
import axios from "axios"
import { v4 as uuid } from "uuid"
import { Todoitem } from "./Todoitem"

export const Todo = () => {
  const [task, setTask] = useState("")
  const [deadline, setDeadline] = useState("")
  const [todos, setTodos] = useState([])
  const data = {
    id: uuid(),
    title: task,
    deadline: deadline,
    status: false,
  }
  useEffect(() => {
    getItem()
  }, [])

  function getItem() {
    axios
      .get("http://localhost:3004/todos")
      .then(({ data }) => {
        setTodos(data)
      })
  }

  return (
    <div className="container">
      <div className="form">
        <label htmlFor="">Task</label>
        <input
          type="text"
          onChange={(e) => {
            setTask(e.target.value)
          }}
        />
        <br />
        <label htmlFor="">Deadline</label>
        <input
          type="datetime-local"
          name=""
          id=""
          onChange={(e) => {
            setDeadline(e.target.value)
          }}
        />
        <br />
        <button
          onClick={() => {
            if (deadline !== "") {
              axios
                .post("http://localhost:3004/todos", data)
                .then((res) => {
                  console.log(res)
                  getItem()
                })
            } else {
              alert("Please Enter Date")
            }
          }}
        >
          Create Task
        </button>
      </div>
      <div className="table">
        <button className="clearBtn"
          onClick={() => {
            todos.map((todo) => {
              if (todo.status) {
                axios
                  .delete(
                    `http://localhost:3004/todos/${todo.id}`
                  )
                  .then(({ data }) => {
                    getItem()
                    console.log(data, "Deleted")
                  })
              }
            })
          }}
        >
          Clear Tasks
        </button>
        <table className="todoTable">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return <Todoitem key={todo.id} data={todo} getItem={getItem} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
