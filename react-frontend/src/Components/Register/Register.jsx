import Logi from '../../assest/imgaes/logo2.png'
import { useState } from 'react'
import apiClient from '../../api/api.js'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loding, setLoding] = useState(false)
  const handeleRegister = async (e) => {
    e.preventDefault()
    try {
      apiClient
        .get('/sanctum/csrf-cookie', {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setLoding(true)
          apiClient.post(
              '/api/register',
              {name , email, password },
              {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((response) => {
              setMessage(response.data.original.message)
              setLoding(false)
            })
            .catch((error) => {
              console.log(error, 'eror login')
            })
        })
        .catch((error) => {
          console.log(error, 'eror csrf')
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 '>
      <div className='w-full max-w-md bg-gray-700  rounded-2xl shadow-lg p-8'>
        <div className="text-center bg-gray-800	text-white rounded-2xl		py-3 mb-4">
          {message.length === 0 ? "" : message}
        </div>
        <img className='h-auto w-1/5 justify-self-center mb-3 ' src={Logi} alt='logo' />
        <h2 className='text-2xl font-bold mb-6 text-center text-white '>Register</h2>
        <form onSubmit={handeleRegister} >
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-white  mb-1'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              placeholder='ehsan'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                       bg-gray-50 border-gray-300 text-black '
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-white  mb-1'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              placeholder='email@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                       bg-gray-50 border-gray-300 text-black '
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-white   mb-1'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              required
              placeholder='••••••••'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                       bg-gray-50 border-gray-300 text-black '
            />
          </div>

          {
            !loding ?(
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Register
            </button>) :
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>

          }
        </form>
      </div>
    </div>
  )
}
