import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage"
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"
import Patient from "./pages/Patient"
import Admin from "./pages/Admin"
import Healthcare from "./pages/Healthcare"
import InsuranceCompany from "./pages/InsuranceCompany"
import Widget from "./components/Admin/Widget"
import AddHealthcare from "./components/Admin/AddHealthcare"
import AddInsuranceCompany from "./components/Admin/AddInsuranceCompany"
import UserDetails from "./components/Admin/UserDetails"


const App=()=>{
  return(
    <div>

<Routes>
   {/* Landing Page */}
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/sign-up" element={<Signup/>} />
                <Route path="/patient" element={<Patient/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/healthcare" element={<Healthcare/>}/>
                <Route path="/insurance-company" element={<InsuranceCompany/>}/>
                
              <Route path="/admin" element={<Admin/>}>
              <Route path="" element={<Widget/>}/>
              <Route path="/admin/add-healthcare" element={<AddHealthcare/>}/>
              <Route path="/admin/add-insuranceCompany" element={<AddInsuranceCompany/>}/>
              <Route path="/admin/user-details" element={<UserDetails/>}/>

              </Route>


</Routes>


    </div>
  )
}

export default App