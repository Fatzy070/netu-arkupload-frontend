import { BrowserRouter , Routes , Route } from "react-router-dom"
import ProtectedRoute from "./pages/auth/ProtectedRoute"
import Gate from "./pages/auth/Login"
import Hopper from "./components/Home"
import Residue from "./components/File"
import NotFound from "./pages/NotFound"
function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Gate />} />
            <Route path="/signup" element={<Gate />} />

            <Route element={<ProtectedRoute />} >
                <Route path='/' element={<Hopper />} />
                <Route path="files" element={<Residue />} />
            </Route>

            <Route path='*' element={<NotFound /> }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
