import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../api/api"


const User = () =>{
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const changeHandler =(e) =>{
        setUserName(e.target.value)
    }

   const onclickHandler = async(e) =>{
        e.preventDefault()
        const user = await axios.post(`${BASE_URL}/user/createUser`, {name:userName})
        if(user.data.success){
            navigate('/todo')
        }
    } 

    return   <div className="flex justify-center items-center min-h-screen bg-white animate-fadeIn">
    <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105 animate-slideInUp">
      <h1 className="text-3xl font-extrabold text-black text-center mb-6 animate-fadeInDelay">Enter Your Name</h1>
      <p className="text-center text-gray-800 mb-4 animate-fadeInDelay">We need your name to personalize your experience.</p>
      <input
        type="text"
        placeholder="Enter your Name"
        value={userName}
        onChange={changeHandler}
        className="w-full p-4 border-2 border-[#2F3645] rounded-lg mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all outline-none"
      />
      <button
        onClick={onclickHandler}
        className="w-full bg-[#2F3645] text-white text-lg py-3 rounded-lg hover:bg-black transition duration-300 ease-in-out transform hover:scale-105 animate-fadeInDelay"
      >
        Submit
      </button>
    </div>
  </div>
}

export default User