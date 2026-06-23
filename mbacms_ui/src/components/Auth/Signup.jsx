import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {


    const [fullName, setFullName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [errMsg, setErrMsg] = useState();


    
    const navigate = useNavigate();
    const signupApi = "http://localhost:8080/api/auth/register";

const onSignup = async (e) => {
        e.preventDefault();

        const userData = {
            fullName: fullName,
            username: userName,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        };

        try {
            const response = await axios.post(signupApi, userData);
            console.log(response.data);
            navigate("/login");
        } catch (err) {
            setErrMsg("Registration failed. Please try again.");
        }
    };


    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-7 col-lg-5">
                        <div className="card auth-card p-4 p-sm-5">

                            <div className="text-center mb-4">
                                <h2 className="brand-logo mb-1">CareAssist</h2>
                                <p className="text-muted small">Medical Billing & Claims Management System</p>
                            </div>

                            <h4 className="fw-bold text-dark mb-4 text-center">Create Account</h4>

                            <form onSubmit={(e) => onSignup(e)}>
                                {
                                    errMsg !== undefined ?
                                    <div className="alert alert-primary">
                                        {errMsg}
                                    </div> :
                                    ""
                                }
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label text-secondary small fw-semibold">Full Name</label>
                                    <input type="text" className="form-control p-2" id="fullName" placeholder="Enter your full name" 
                                    onChange={(e)=>{setFullName(e.target.value)}}required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label text-secondary small fw-semibold">Username</label>
                                    <input type="text" className="form-control p-2" id="userName" placeholder="Enter your username" required 
                                    onChange={(e)=>{setUserName(e.target.value)}}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-secondary small fw-semibold">Work Email Address</label>
                                    <input type="email" className="form-control p-2" id="email" placeholder="example@gmail.com" required 
                                    onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>

                                {/* <div className="mb-3">
                                    <label htmlFor="role" className="form-label text-secondary small fw-semibold">Portal Role</label>
                                    <select className="form-select p-2" id="role" defaultValue="" required>
                                        <option value="" disabled>Select your portal role...</option>
                                        <option value="Patient">Patient</option>
                                        <option value="Healthcare">Healthcare Provider</option>
                                        <option value="Insurance_Company">Insurance Representative</option>
                                    </select>
                                </div> */}

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-secondary small fw-semibold">Password</label>
                                    <input type="password" className="form-control p-2" id="password" placeholder="Minimum 8 characters" required 
                                    onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label text-secondary small fw-semibold">
                                        Phone Number
                                    </label>
                                    <input type="tel" id="phoneNumber" className="form-control p-2" placeholder="Enter your phone number" pattern="[0-9]{10}" maxLength="10" 
                                    onChange={(e)=>setPhoneNumber(e.target.value)}required />
                                </div>
                                <div className="mb-4 form-check">
                                    <input type="checkbox" className="form-check-input" id="terms" required />
                                    <label className="form-check-label text-secondary small" htmlFor="terms">
                                        I agree to terms and conditions
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-auth-primary w-100 py-2">Register Account</button>
                            </form>

                            <div className="text-center mt-3">
                                <p className="text-secondary small mb-0">
                                    Already have an account?{" "}
                                    <span className="fw-semibold" style={{ color: "#14b8a6", cursor: "pointer" }} onClick={() => navigate("/login")}>
                                        Sign in here
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

export default Signup;