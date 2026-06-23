import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const HomeBody = () => {

    const navigate=useNavigate()
    return (
        <section className="hero-section">

            <div className="container">

                <div className="row align-items-center">

                    {/* LEFT CONTENT */}

                    <div className="col-lg-6">

                        <span className="hero-badge">
                            Medical Billing & Claims Management System
                        </span>

                        <h1 className="hero-title">

                            Simplify Medical Billing,
                            Claims Processing &
                            Insurance Verification

                        </h1>

                        <p className="hero-description">

                            Manage patient billing,
                            insurance claims,
                            payment tracking and revenue
                            analytics from one platform.

                        </p>

                        <div className="d-flex gap-3">

                            <Button label="Get Started" icon="pi pi-arrow-right"
                            onClick={()=>navigate("/sign-up")}
                            />



                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="col-lg-6">

                        <div className="hero-animation">

                            {/* animated cards */}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HomeBody;