import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Regester.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatBox from "./components/ChatBox/ChatBox.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route
                path="/chat-Box"
                element={
                    <ProtectedRoute>
                        <ChatBox />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>
  )
}

export default App
