import { useEffect, useState } from "react";
import Card from "./Card";
import MakeTodo from "./MakeTodo";
import axios from "axios";
import { BASE_URL } from "../api/api";
import Navbar from "./Navbar";

const Todo = () => {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false)

  const [todoValue, setTodoValue] = useState([])


  const showInputHandler = () => {
    setShowInput(!showInput);
  };


  const getAllTodos = async() =>{
    try {
        setLoading(true)
        const todo = await axios.get(`${BASE_URL}/todo/getAllTodo`)
        localStorage.clear('todos')
        localStorage.setItem('todos',JSON.stringify(todo.data.data))
       
        const allTodos = localStorage.getItem('todos')
        const setNew =  await JSON.parse((allTodos))
        setTodoValue(setNew)
        setLoading(false)
    } catch (error) {
        throw new Error(error)
    }
  }

  useEffect(()=>{
    getAllTodos()
  },[])



  const handleFilterTodos = async(value)=>{
    console.log(value)
      const allTodos = await JSON.parse(localStorage.getItem('todos'))
      const FilteredTodos = allTodos.filter((todo)=>{
        return todo.status == value
      })
        setTodoValue(FilteredTodos)
  }


  const handleRemoveFilter = async()=>{
    const filteredTodos = await JSON.parse(localStorage.getItem('todos'))
    setTodoValue(filteredTodos)
  }

  return (
    loading ?  <div className="text-black text-lg text-center">This is Loading...</div>:
<>

    <Navbar/>
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <button
        onClick={showInputHandler}
        className=" self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        NEW +
      </button>

      <div className="px-10">

        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  onClick={(e)=>handleFilterTodos('Completed')}>Completed</button>
        <button type="button"  onClick={(e)=>handleFilterTodos('Uncompleted')} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Uncompleted</button>
      <button onClick={(e)=>handleFilterTodos('Active')} type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Active</button>
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleRemoveFilter}>Remove filter</button>
      </div>
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {
            todoValue.length <= 0 ?<p> No todo exist </p>:todoValue.map((todo)=>{
                return (<Card key={todo._id} id={todo._id} title={todo.title} description ={todo.description} status={todo.status} setTodoValue={setTodoValue} todoValue={todoValue}/>)
            })
        }
      </div>
      <div className="w-full">
      {showInput && <MakeTodo setShowInput={setShowInput} setTodoValue={setTodoValue} />}

      </div>
    </div>
    </>
  );
};

export default Todo;
