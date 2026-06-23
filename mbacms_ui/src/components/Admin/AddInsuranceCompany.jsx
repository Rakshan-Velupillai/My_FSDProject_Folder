import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Toast } from "primereact/toast"
import { useRef, useState } from "react"

function AddInsuranceCompany() {

    const navigate = useNavigate()

    const postApi = "http://localhost:8080/api/insurance-company/user-profile"

    const [fullName, setFullName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const [companyName, setCompanyName] = useState()
    const [regNo, setRegNo] = useState()
    const [address, setAddress] = useState()

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()
    const toast = useRef()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const body = {
            fullName: fullName,
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            companyName: companyName,
            regNo: regNo,
            address: address
        }

        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        try {

            await axios.post(postApi, body, config)

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Insurance Company Added Successfully"
            })

            setSuccessMsg("Insurance Company Added")
            setErrMsg(undefined)
            setFullName("")
            setUsername("")
            setEmail("")
            setPassword("")
            setPhoneNumber("")
            setCompanyName("")
            setRegNo("")
            setAddress("")

            // navigate("/user-details")

        }
        catch (err) {

            console.log(err)

            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Operation Failed"
            })
            setErrMsg("Operation Failed")
            setSuccessMsg(undefined)
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center pb-5">

            <Toast ref={toast} />

            <div
                className="card shadow border-0 rounded-4"
                style={{ width: "100%", maxWidth: "750px" }}
            >

                <div
                    className="card-header text-white p-4 rounded-top-4"
                    style={{
                        background: "linear-gradient(135deg, #2563eb, #14b8a6)"
                    }}
                >
                    <h3 className="mb-1 fw-bold">
                        <i className="pi pi-building me-2"></i>
                        Add Insurance Company
                    </h3>

                    <p className="mb-0 opacity-75 small">
                        Add a new insurance company to the system.
                    </p>
                </div>

                <div className="card-body p-4">

                    {/* {
                        successMsg !== undefined ?
                            <div className="alert alert-success">
                                {successMsg}
                            </div>
                            : ""
                    }

                    {
                        errMsg !== undefined ?
                            <div className="alert alert-danger">
                                {errMsg}
                            </div>
                            : ""
                    } */}

                    <form onSubmit={(e)=>handleSubmit(e)}>

                        <h5 className="text-secondary border-bottom pb-2 mb-3 fw-semibold">
                            Account Information
                        </h5>

                        <div className="row g-3 mb-4">

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Full Name</label>
                                <input type="text" required className="form-control" placeholder="e.g. Star Health Admin" value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Username </label>
                                <input type="text" required className="form-control" placeholder="e.g. starhealth_admin" value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Email Address </label>

                                <input type="email" required className="form-control" placeholder="admin@company.com" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Account Password </label>

                                <input type="password" required className="form-control" placeholder="********" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Phone Number</label>

                                <input type="text" required className="form-control" placeholder="10 digit number" value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>

                        </div>

                        <h5 className="text-secondary border-bottom pb-2 mb-3 fw-semibold">Company Details </h5>

                        <div className="row g-3 mb-4">

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Company Name</label>

                                <input type="text" required className="form-control" placeholder="e.g. Star Health Insurance" value={companyName} 
                                    onChange={(e) => setCompanyName(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Registration Number</label>

                                <input type="text" required className="form-control" placeholder="e.g. SHI-2026-001" value={regNo}
                                    onChange={(e) => setRegNo(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-bold text-dark small">Address</label>
                                <textarea required className="form-control" rows="3" placeholder="Enter company address" value={address}
                                    onChange={(e) => setAddress(e.target.value)}></textarea>
                            </div>

                        </div>

                        <div className="text-end">

                            <button type="button" className="btn btn-light px-4 border me-4"
                                onClick={() => navigate("/user-details")}>
                                Cancel </button>

                            <button type="submit" className="btn text-white px-4 fw-bold" style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", border: "none" }}>
                                Save</button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default AddInsuranceCompany