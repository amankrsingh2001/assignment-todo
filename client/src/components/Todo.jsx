import { useEffect, useState } from "react";
import Card from "./Card";
import MakeTodo from "./MakeTodo";
import axios from "axios";
import { BASE_URL } from "../api/api";

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
    <div className="min-h-screen bg-gray-500 p-6 flex flex-col">
      <button
        onClick={showInputHandler}
        className="mt-6 self-end border-2 border-white bg-white text-black rounded-lg p-2 shadow-md hover:bg-gray-200 transition"
      >
        NEW +
      </button>

      <div>
        <button className="bg-white text-black rounded-md p-2 mr-2" onClick={(e)=>handleFilterTodos('Active')}>Active</button>
        <button className="bg-white text-black rounded-md p-2 mr-2"  onClick={(e)=>handleFilterTodos('Completed')} >Completed</button>
        <button className="bg-white text-black rounded-md p-2 mr-2"  onClick={(e)=>handleFilterTodos('Uncompleted')}>Uncompleted</button>
        <button className="bg-white text-black rounded-md p-2 mr-2"  onClick={handleRemoveFilter}>Remove filter</button>

      </div>
      <div className=" w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
};

export default Todo;
