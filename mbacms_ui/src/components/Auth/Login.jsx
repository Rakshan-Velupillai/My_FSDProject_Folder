import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const [errMsg,setErrMsg]=useState()
    const navigate = useNavigate();

const loginApi="http://localhost:8080/api/auth/login"
    const userDetailsApi="http://localhost:8080/api/auth/user-details"


    const onLogin=async (e)=>{
        e.preventDefault();

        const config={
            headers :{
                "Authorization" : "Basic "+window.btoa(username+":"+password)
            }
        }
        try{
            const response=await axios.get(loginApi,config)
            console.log(response.data)


            let token=response.data.token
            let username=response.data.username

            //saving the token in localStorage
            localStorage.setItem("token",token)
            //saving username in localStorage
            localStorage.setItem("username",username)

            //prepare the header
             const configDetails={
            headers :{
                "Authorization" : "Bearer "+token
            }
        }

        //fetch user details

        const resp=await axios.get(userDetailsApi,configDetails)
        console.log(resp.data)

        let role=resp.data.role
        console.log(role)
        switch(role){
            case "PATIENT":
                navigate("/patient")
                break;
            case "HEALTHCARE":
                navigate("/healthcare")
                break;
            case "INSURANCE_COMPANY":
                navigate("/insurance-company")
                break;
            case "ADMIN":
                navigate("/admin")
                break;
            default:
                setErrMsg("Invalid data")
                break;
        }

        }
        catch(err){
            setErrMsg("Invalid data")
        }
    }




    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card auth-card p-4 p-sm-5">
                            
                            {/* Logo Context */}
                            <div className="text-center mb-4">
                                <h2 className="brand-logo mb-1">CareAssist</h2>
                                <p className="text-muted small"> Medical Billing & Claims Management System</p>
                            </div>

                            <h4 className="fw-bold text-dark mb-4 text-center">Welcome Back</h4>

                            <form onSubmit={(e)=>onLogin(e)}>
                                 {
                                    errMsg!==undefined?
                                    <div className="alert alert-primary" >
                                             {errMsg}
                                        </div>:
                                        ""
                                }
                                 <div className="mb-3">
                                    <label htmlFor="userName" className="form-label text-secondary small fw-semibold">Username</label>
                                    <input type="text" className="form-control p-2" id="userName" placeholder="Enter your username" required 
                                    onChange={(e)=>{setUsername(e.target.value)}}/>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <label htmlFor="password" className="form-label text-secondary small fw-semibold mb-0">Password</label>
                                    </div>
                                    <input type="password" className="form-control p-2" id="password" placeholder="••••••••" required 
                                    onChange={(e)=>setPassword(e.target.value)}/>
                                </div>

                               

                                <button type="submit" className="btn btn-auth-primary w-100 py-2">Sign In</button>
                            </form>

                            <div className="text-center mt-3">
                                <p className="text-secondary small mb-0">
                                    New to CareAssist?{" "}
                                    <span className="fw-semibold" style={{ color: "#14b8a6", cursor: "pointer" }} onClick={() => navigate("/sign-up")}>
                                        Create an account
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;