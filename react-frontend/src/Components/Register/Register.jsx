import Logi from  '../../assest/imgaes/logo2.png'

export function Register() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 '>
      <div className='w-full max-w-md bg-gray-700  rounded-2xl shadow-lg p-8'>
        <img className="h-auto w-1/5 justify-self-center mb-3 " src={Logi} alt="logo"  />
        <h2 className='text-2xl font-bold mb-6 text-center text-white '>Register</h2>
        <form>
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
              className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                       bg-gray-50 border-gray-300 text-black '
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
