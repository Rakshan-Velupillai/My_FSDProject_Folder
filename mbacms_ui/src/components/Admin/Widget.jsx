import React from "react";
import { Link } from "react-router-dom";

const Widget = () => {
    const quickActions = [
        {
            title: "Manage Healthcare",
            description: "Register new healthcare organizations and manage existing providers.",
            link: "/admin/add-healthcare",
            icon: "pi-building",
            color: "#3b82f6",
            bgColor: "rgba(59, 130, 246, 0.1)"
        },
        {
            title: "Manage Insurance Partners",
            description: "Onboard insurance providers and configure their access details.",
            link: "/admin/add-insuranceCompany",
            icon: "pi-shield",
            color: "#14b8a6",
            bgColor: "rgba(20, 184, 166, 0.1)"
        },
        {
            title: "User Accounts Directory",
            description: "Search, filter, sort all registered users and manage active roles.",
            link: "/admin/user-details",
            icon: "pi-users",
            color: "#aa3bff",
            bgColor: "rgba(170, 59, 255, 0.1)"
        }
        // {
        //     title: "Create Administrators",
        //     description: "Grant administrative access and create new system console admins.",
        //     link: "/admin/add-admin",
        //     icon: "pi-user-plus",
        //     color: "#f59e0b",
        //     bgColor: "rgba(245, 158, 11, 0.1)"
        // }
    ];

    return (
        <div className="container py-4 text-start animate-fade-in">
            {/* Welcome Banner */}
            <div
                className="card border-0 p-5 text-white mb-5 position-relative overflow-hidden shadow-sm"
                style={{
                    borderRadius: "20px",
                    background: "linear-gradient(135deg, #2563eb, #14b8a6)"
                }}
            >
                {/* Decorative background shape */}
                <div
                    style={{
                        position: "absolute",
                        right: "-50px",
                        bottom: "-50px",
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)"
                    }}
                />

                <h1 className="fw-bold mb-2 text-white text-start" style={{ fontSize: "2.5rem", letterSpacing: "-0.5px", margin: "0" }}>
                    Administrator Console
                </h1>
                <p className="lead text-white-50 mb-0" style={{ fontSize: "1.1rem" }}>
                    Welcome back! Manage healthcare providers, insurance companies, system users, and global configurations.
                </p>
            </div>

            {/* Grid title */}
            <h4 className="fw-bold text-dark mb-4">Quick Management Actions</h4>

            {/* Quick Actions Grid */}
            <div className="row g-4">
                {quickActions.map((action, index) => (
                    <div key={index} className="col-md-6 col-lg-3">
                        <Link
                            to={action.link}
                            className="text-decoration-none card h-100 border-0 p-4 shadow-sm transition-all text-start"
                            style={{
                                borderRadius: "16px",
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
                            }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center mb-3"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "12px",
                                    backgroundColor: action.bgColor,
                                    color: action.color
                                }}
                            >
                                <i className={`pi ${action.icon} fs-4`}></i>
                            </div>
                            <h5 className="fw-bold text-dark mb-2">{action.title}</h5>
                            <p className="text-secondary small mb-0">{action.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Widget;