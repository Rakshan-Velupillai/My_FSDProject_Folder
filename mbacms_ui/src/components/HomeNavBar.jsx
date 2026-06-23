import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const HomeNavbar = () => {

    const navigate=useNavigate()
    return (
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar">

            <div className="container">

                {/* Logo */}

                {/* <a className="navbar-brand">
                    MBACMS
                </a> */}

                <div className="d-flex align-items-center">

                    <div className="logo-icon">
                        <i className="pi pi-heart-fill"></i>
                    </div>

                    <div className="ms-2">
                        <span className="navbar-brand mb-0">
                            CareAssist
                        </span>
                    </div>

                </div>



                {/* Mobile Toggle */}

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Content */}

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <a className="nav-link">
                                Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                Features
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                Workflow
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                Contact
                            </a>
                        </li>

                    </ul>

                    {/* Buttons */}

                    <Button label="Login" outlined className="login-btn me-2"
                        onClick={()=>navigate("/login")}
                        />

                    <Button label="Sign Up" className="signup-btn"
                        onClick={()=>navigate("/sign-up")}
                    />

                </div>

            </div>

        </nav>
    )
}

export default HomeNavbar;