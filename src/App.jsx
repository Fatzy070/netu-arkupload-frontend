import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import ProtectedRoute from "./auth/ProtectedRoute"
import Home from "./components/Home"
import File from "./components/File"
function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<ProtectedRoute />} >
                <Route path='/' element={<Home />} />
                <Route path="files" element={<File />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
