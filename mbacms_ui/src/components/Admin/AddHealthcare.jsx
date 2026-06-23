import axios from "axios"
import { Toast } from "primereact/toast"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function AddHealthcare() {
    const navigate = useNavigate()


    const postApi = "http://localhost:8080/api/healthcare/user-profile"

    const [fullName, setFullName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const [healthcareName, setHealthcareName] = useState()
    const [specialization, setSpecialization] = useState()
    const [licenseNumber, setLicenseNumber] = useState()
    const [address, setAddress] = useState()

    // const [successMsg, setSuccessMsg] = useState()
    // const [errMsg, setErrMsg] = useState()
    const toast = useRef()


    const handleSubmit = async (e) => {

        e.preventDefault()

        const body = {
            fullName: fullName,
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            healthcareName: healthcareName,
            specialization: specialization,
            licenseNumber: licenseNumber,
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
                detail: "Healthcare Added Successfully"
            })

            // setSuccessMsg("Healthcare Profile Added")
            // setErrMsg(undefined)
            setFullName("")
            setUsername("")
            setEmail("")
            setPassword("")
            setPhoneNumber("")

            setHealthcareName("")
            setSpecialization("")
            setLicenseNumber("")
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

            // setErrMsg("Operation Failed")
            setSuccessMsg(undefined)
        }
    }

    return (
        <div className="container mt-5 d-flex justify-content-center pb-5">
            <Toast ref={toast} />
            <div className="card shadow border-0 rounded-4" style={{ width: "100%", maxWidth: "750px" }}>

                {/* Gradient Card Header */}
                <div
                    className="card-header text-white p-4 rounded-top-4"
                    style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)" }}
                >
                    <h3 className="mb-1 fw-bold"><i className="pi pi-plus-circle me-2"></i>Add Healthcare Provider</h3>
                    <p className="mb-0 opacity-75 small">Register a new hospital or medical facility supervisor profile into the platform.</p>
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
                        <h5 className="text-secondary border-bottom pb-2 mb-3 fw-semibold">Account Information</h5>

                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Full Name</label>
                                <input type="text" name="fullName" required className="form-control" placeholder="e.g. Apollo Hospitals Admin" value={fullName}
                                    onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Username</label>
                                <input type="text" name="username" required className="form-control" placeholder="e.g. apollo_hospital_admin" value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Email Address</label>
                                <input type="email" name="email" required className="form-control" placeholder="admin@apollohospitals.com" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Account Password</label>
                                <input type="password" name="password" required className="form-control" placeholder="••••••••" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Phone Number</label>
                                <input type="text" name="phoneNumber" required className="form-control" placeholder="10 digit number" value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>

                        <h5 className="text-secondary border-bottom pb-2 mb-3 fw-semibold">Healthcare Facility Details</h5>

                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Healthcare Name</label>
                                <input type="text" name="healthcareName" required className="form-control" placeholder="e.g. Apollo Hospitals" value={healthcareName}
                                    onChange={(e) => setHealthcareName(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold text-dark small">Specialization</label>
                                <input type="text" name="specialization" required className="form-control" placeholder="e.g. Multi-Speciality Hospital" value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-bold text-dark small">Medical License Number</label>
                                <input type="text" name="licenseNumber" required className="form-control" placeholder="e.g. HOSP-APOLLO-2026-001" value={licenseNumber}
                                    onChange={(e) => setLicenseNumber(e.target.value)} />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-bold text-dark small">Physical Address</label>
                                <textarea name="address" required className="form-control" rows="3" placeholder="21 Greams Lane, Thousand Lights, Chennai, Tamil Nadu" value={address}
                                    onChange={(e) => setAddress(e.target.value)}></textarea>
                            </div>
                        </div>

                        <div className="text-end">
                            <button type="button" className="btn btn-light px-4 border me-4" onClick={() => navigate("/user-details")}>
                                Cancel
                            </button>

                            <button type="submit" className="btn text-white px-4 fw-bold"
                                style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", border: "none" }}>Save</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddHealthcare