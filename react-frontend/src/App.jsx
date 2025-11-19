import LoginPage from './Components/Login/Login.jsx'
import { Register } from './Components/Register/Register.jsx'
import ChatBoxPage from './Components/ChatBox/ChatBox.jsx'
import { AuthProvider } from './ConText/AuthContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage />}/>
          <Route path="/register" element={ <Register />}/>
          <Route path="/chatbot" element={ <ChatBoxPage />}/>
          <Route path="/chatbot/:chat_id" element={ <ChatBoxPage />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
