import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import api from '../api/api'

const Total = styled.div`
  padding-top: 10px;
`;

const Active = styled.div`
  font-weight: bold;
`;

const Done = styled.div`
  text-decoration: line-through;
`;

const Todo = styled.h3`
  font-weight: bold;
`

function Tasks() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('')
    const [loading, setLoading] = useState(false)

    const completedTasks = todos.filter(({ done })=> done)
    const notCompletedTasks = todos.filter(({ done })=> !done)
    const count = todos.length

    useEffect(() => {
      getTodos()
    }, [])

    const getTodos = async () => {
      setLoading(true)
      const todoList = (await api.get('/')).data
      setTodos(todoList)
      setLoading(false)
    };

    const toggleTask = async (id) => {
      await api.patch(`status/${id}`)
      await getTodos()
    }

    const addNewTask = async (e) => {
      e.preventDefault()
      await api.post('/', {
          title: newTask
      })
      setNewTask('')
      await getTodos()
    }

  return (
    <>
      <input
        type="text"
        placeholder='Add new task'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={(e) => addNewTask(e)}>
        Add
      </button>
      <Todo>Planned tasks:</Todo>
      {loading ?
        <div> Loading, please wait </div> :
        notCompletedTasks.map(
          (task) =>
            <Active
              onClick={() => toggleTask(task.id)}
              key={task.id}
            >
              {task.title}
            </Active>
          )
      }
      <Todo>Completed tasks:</Todo>
      {loading ?
        <div> Loading, please wait </div> :
        completedTasks.map(
          (task)=>
            <Done
              onClick={() => toggleTask(task.id)}
              key={task.id}>
                {task.title}
              </Done>
          )
      }
      <Total>Total tasks: {count}</Total>
    </>
  )
}

export default Tasks