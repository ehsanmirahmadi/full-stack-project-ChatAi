import Logi from "../../assest/imgaes/logo2.png";
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../ConText/AuthContext.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apiClient from '../../api/api.js'

export default function ChatBoxPage() {
    const { chat_id } = useParams()
    const userData = JSON.parse(localStorage.getItem('user'))
    const userToken = localStorage.getItem('token')

    const [chatList, setChatList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const fetchChat = async ()=> {
        setLoading(true)
        await apiClient.get('api/chats' , {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${userToken}`
            },
        }).then(response => {
            setChatList(response.data.original.chat)
            setLoading(false)
        }).catch(error => {
            setError(error)
            setLoading(false)
        })
    }

    useEffect( () => {
        fetchChat()
    }, [])

    console.log(chatList)
    return (

        <div className="min-h-screen flex bg-gray-900 text-white">
            <h1>{chat_id}</h1>
            <div className="w-[25%] bg-gray-800 flex flex-col justify-between p-4">
                <div>
                    <div className="flex justify-center mb-6">
                        <img
                            className="h-12 w-auto"
                            src={Logi}
                            alt="logo"
                        />
                    </div>


                    <div className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-xl text-center cursor-pointer mb-4">
                        + New Chat
                    </div>


                    <div className="space-y-2">
                        {
                            chatList ? chatList.map((chat , index) => {
                                return (
                                    <div onClick={()=> navigate(`${chat.id}`)} key={index} className="bg-gray-700 p-3 rounded-xl flex justify-between items-center hover:bg-gray-600">
                                    <span className="truncate">{chat.title}</span>
                                    <a href="#" className="text-red-400 text-sm hover:text-red-600">delete</a>
                                    </div>
                                )
                            }) : (<h1>Not Found</h1>)
                        }
                    </div>
                </div>


                <div className="text-center text-2xl text-gray-400 mt-6">
                    User: <span className="font-medium text-white">{userData.name}</span>
                </div>
            </div>
            {
                chat_id ?
                  <div className="w-[70%] flex flex-col justify-between p-6 bg-gray-900">
                      <div className="flex-1 overflow-y-auto space-y-4">

                          <div className="flex">
                              <div className="max-w-[70%] bg-gray-700 text-white p-3 rounded-xl rounded-tl-none">
                                  سلام! چطور می‌تونم کمکت کنم؟
                              </div>
                          </div>


                          <div className="flex justify-end">
                              <div className="max-w-[70%] bg-blue-600 text-white p-3 rounded-xl rounded-tr-none">
                                  سلام، یه سوال دارم درباره پروژه‌م...
                              </div>
                          </div>

                          <div className="flex">
                              <div className="max-w-[70%] bg-gray-700 text-white p-3 rounded-xl rounded-tl-none">
                                  حتماً، لطفاً سوالتو بپرس
                              </div>
                          </div>
                      </div>

                      {/* Input */}
                      <form className="mt-6">
                          <div className="relative w-full max-w-3xl mx-auto">
                              <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full py-3 px-4 pr-24 rounded-xl bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                              >
                                  Send
                              </button>
                          </div>
                      </form>
                  </div>
                  : <div className="w-[70%] mx-auto p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white">
                      <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
                          Hello My Friend is AI Chat
                      </h1>
                      <p className="text-lg opacity-90">
                          Powered by AI, ready to help you anytime!
                      </p>
                  </div>
            }
        </div>


    )
}