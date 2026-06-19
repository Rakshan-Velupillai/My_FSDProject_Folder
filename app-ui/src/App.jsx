import { Route, Routes } from "react-router-dom"
import UserList from "./components/UserList"
import Home from "./page/Home"
import AddUser from "./components/AddUser"
import Paginated from "./components/Paginated"

const App=()=>{

  return(
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/user-list" element={<UserList/>}></Route>
    <Route path="/add-user" element={<AddUser/>}></Route>
    <Route path="/page" element={<Paginated/>}></Route>

    </Routes>
  )
}
export default App