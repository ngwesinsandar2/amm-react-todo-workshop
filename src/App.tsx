import { useState } from 'react'
import './App.css'

interface Todos {
  id: number,
  task_name: string,
  isFinished: boolean
};

function App() {
  const [todos, setTodos] = useState<Todos[]>([
    {
      id: Math.random(),
      task_name: "To Watch Call It Love",
      isFinished: false,
    },
    {
      id: Math.random(),
      task_name: "To buy snacks",
      isFinished: true,
    }
  ]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    let searchedTodos = todos.filter(todo => {
      return todo.task_name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
    })
    setTodos(searchedTodos)
    e.target.reset();
  }

  const handleCategory = (e: any) => {
    console.log(e.target.value)
    // if (e.target.value === "finished") {
      let filteredTodos = todos.filter(todo => {
        if (e.target.value === "finished") {
          return todo.isFinished === true;
        } else if (e.target.value === "unfinish") {
          return todo.isFinished === false;
        } else {
          return todo;
        }
      })
      console.log(filteredTodos)
      setTodos(filteredTodos);
    // }else{
    //   let unFinishTodos = todos.filter(todo => {
    //     return todo.isFinished === false;
    //   })
    //   console.log(unFinishTodos)
    //   // setTodos(unFinishTodos);
    // }
  }

  const handleSubmit = (e: {
    [x: string]: any; preventDefault: () => void;
  }) => {
    e.preventDefault();
    setTodos([...todos, {
      id: Math.random(),
      task_name: taskInput,
      isFinished: false,
    }])
    e.target.reset();
  }

  const handleDone = (todo: Todos) => {
    setTodos(prevTodos => {
      return prevTodos.map(prevTodo => {
        if (prevTodo.id === todo.id) {
          return {
            ...prevTodo,
            isFinished: !prevTodo.isFinished
          }
        }

        return prevTodo
      })
    })
  }

  const handleDelete = (todoId: number) => {
    let withoutDeleteTodo = todos.filter(todo => {
      return todo.id !== todoId;
    })
    setTodos(withoutDeleteTodo)
  }

  return (
    <>
      <select onChange={(e) => handleCategory(e)} defaultValue={'DEFAULT'}>
        <option value="DEFAULT" disabled>Category</option>
        <option value="all">All Tasks</option>
        <option value="finished">Finished Tasks</option>
        <option value="unfinish">Unfinish Tasks</option>
      </select>

      <form onSubmit={handleSearch}>
        <input type="text" onChange={e => setSearchInput(e.target.value)} />
        <button>Search</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setTaskInput(e.target.value)} />
        <button>Add</button>
      </form>

      <ul>
        {
          todos.map(todo => {
            return (
              <li key={todo.id}>
                {todo.task_name}
                {todo.isFinished ? <span>Finished</span> : <span>Not Yet</span>}
                <button onClick={() => handleDone(todo)}>{todo.isFinished ? <span>Undo</span> : <span>Done</span>}</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default App
