import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Regester.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ChatBox from "./components/ChatBox/ChatBox.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                  <Route path="/chat-Box" element={<ChatBox />} />
                  {/* سایر مسیرهای محافظت شده */}
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
