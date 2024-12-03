import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BASE_URL } from "../api/api";


const Card = ({ title, description, status, id, setTodoValue, todoValue }) => {
  const [statusValue, setStatusValue] = useState(status);
  const [loading, setLoading] = useState(false);

  const onchangeHandler = async (e) => {
    try {
      setLoading(true);
      setStatusValue(e.target.value);
      const changeStatus = await axios.put(
        `${BASE_URL}/todo/updateStatus`,
        { id, statusValue: e.target.value }
      );
      const allTodo = await JSON.parse(localStorage.getItem("todos"));
      const updatedTodo = allTodo.map((todo) => {
        return todo._id === changeStatus?.data?.data?._id 
        ? changeStatus.data.data
        :todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      setLoading(false);
    } catch (error) {
      throw new Error(error)
    }
  };

  const deleteTodoHandler = async () => {
    const deletetodo = await axios.post(
      `${BASE_URL}/todo/deleteTodo`,
      { id }
    );
    if (deletetodo.data.success) {
      const newTodo = todoValue.filter((todo) => todo._id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      setTodoValue(newTodo);
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <div className=" w-[80%] mx-auto  mt-8 p-6 bg-gradient-to-br flex flex-col gap-4 from-[#1B1833] to-[#1A1A1D] text-white shadow-lg rounded-xl border border-gray-700 ">
      <p
        className={`text-sm w-fit mb-4 capitalize inline-block px-3 py-1 rounded-full ${
          statusValue === "Completed"
            ? "text-green-400 bg-green-500/25"
            : statusValue === "Uncompleted"
            ? "text-red-500 bg-red-600/25"
            : "text-yellow-500 bg-yellow-600/25"
        } text-gray-100`}
      >
        {statusValue}
      </p>
      <h3 className="text-2xl flex justify-between items-center gap-2 font-semibold mb-4 text-wrap">
        {title}
        <div className="cursor-pointer">
          <MdDelete
            className="text-2xl hover:text-red-500 transition-colors"
            onClick={deleteTodoHandler}
          />
        </div>
      </h3>
      <p className="text-base mb-3 text-gray-200 text-wrap">{description}</p>

      <select
        value={statusValue}
        onChange={onchangeHandler}
        className={`w-full  p-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value={"Active"}>Active</option>
        <option value={"Completed"}>Completed</option>
        <option value={"Uncompleted"}>Uncompleted</option>
      </select>
    </div>
  );
};

export default Card;
