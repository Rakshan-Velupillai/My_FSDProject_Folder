import { Button } from "primereact/button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Widget from "../components/Admin/Widget";

const Admin = () => {

    const navigate = useNavigate()
    return (
        <div>
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
                                <Link to="/admin" className="navbar-link fw-bold text-dark tracking-tight text-decoration-none transition-all">
                                    ADMIN DashBoard
                                </Link>

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
                                <Link to="/admin/add-healthcare" className="nav-link">
                                    Add Healthcare
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/admin/add-insuranceCompany" className="nav-link">
                                    Add Insurance Company
                                </Link>

                            </li>

                            <li className="nav-item">
                                <Link to="/admin/user-details" className="nav-link">
                                    User Details
                                </Link>

                            </li>


                        </ul>




                        <Button label="logout" className="signup-btn"
                            onClick={() => navigate("/login")}
                        />

                    </div>

                </div>

            </nav>



            <div className="container pt-5 mt-5">
                <Outlet />

            </div>

        </div>

    )
}
export default Admin