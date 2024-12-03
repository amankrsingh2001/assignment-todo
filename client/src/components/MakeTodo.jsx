import axios from "axios";
import {  useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BASE_URL } from "../api/api";


const MakeTodo = ({setShowInput, setTodoValue}) => {
    const [todo, settodo] = useState({
        title:'',
        description:'',
        status:'Active'
    })

  const changeHander = (e) => {
    settodo((prev)=>({...prev, [e.target.name]:e.target.value}))
    
  };

  const submitHandler = async(e) =>{
    e.preventDefault()

    const createTodo = await axios.post(`${BASE_URL}/todo/createTodo`, {todo})
        if(createTodo.data.success){
          setTodoValue((prev)=>([...prev, createTodo?.data?.data]))
          setShowInput(false)
        }
    }
  

  return (
    <div onClick={()=>setShowInput(false)} className="fixed inset-1 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <form onSubmit={submitHandler} className="w-full flex  justify-center" onClick={(e)=>{
        e.stopPropagation()
      }} >
        <div className="w-[32%]  rounded-lg bg-white border shadow-lg border-richblack-400 bg-richblack-800 p-6">
          <p className="text-2xl  text-richblack-5 font-medium">
            Create your todo
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col mt-3">
              <label>Title</label>
              <input
              onChange={changeHander}
              name = "title"
                className="p-2 outline-black border-[2px] border-gray-400 rounded-md"
                type="text"
                placeholder="Enter the title"
              />
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <textarea
              onChange={changeHander}
              name = "description"
                className="p-2 outline-black  border-[2px] border-gray-400  rounded-md"
                type="text"
                placeholder="Enter your Description"
              />
            </div>
          </div>

            <button
                type="submit"
                className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900 w-full bg-black text-white mt-[4%]"
            >
                Create Todo
            </button>

        </div>
      </form>
      <IoCloseCircleSharp data-testid="close-icon"  className="cursor-pointer text-4xl text-gray-400  shadow-2xl rounded-full absolute  right-12 top-12  " onClick={()=>setShowInput(false)}/>
    </div>
  );
};

export default MakeTodo;
