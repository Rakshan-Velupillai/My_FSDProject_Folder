import React from "react";

const Sidebar = ({
    resolvedOnboardingStatus,
    activeTab,
    setActiveTab,
    setErrorMsg,
    username,
    handleLogout
}) => {
    return (
        <div className="p-3 text-white d-flex flex-column justify-content-between" style={{ width: "280px", background: "linear-gradient(135deg, #2563eb, #14b8a6)" }}>
            <div>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom border-white-20">
                    <i className="pi pi-heart-fill me-2 fs-4"></i>
                    <span className="fs-5 fw-bold text-white tracking-wider">CareAssist Patient</span>
                </div>

                {resolvedOnboardingStatus === "ACTIVE" && (
                    <ul className="nav nav-pills flex-column gap-2">
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                    activeTab === "dashboard"
                                        ? "bg-white text-dark fw-bold shadow-sm"
                                        : "bg-transparent text-white hover-bg-white-10"
                                }`}
                                onClick={() => { setActiveTab("dashboard"); setErrorMsg(""); }}
                            >
                                <i className="pi pi-chart-line me-2"></i> Portal Dashboard
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                    activeTab === "invoices"
                                        ? "bg-white text-dark fw-bold shadow-sm"
                                        : "bg-transparent text-white hover-bg-white-10"
                                }`}
                                onClick={() => { setActiveTab("invoices"); setErrorMsg(""); }}
                            >
                                <i className="pi pi-file-excel me-2"></i> My Invoices
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                    activeTab === "profile"
                                        ? "bg-white text-dark fw-bold shadow-sm"
                                        : "bg-transparent text-white hover-bg-white-10"
                                }`}
                                onClick={() => { setActiveTab("profile"); setErrorMsg(""); }}
                            >
                                <i className="pi pi-user-edit me-2"></i> My Profile
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                    activeTab === "submit-claim"
                                        ? "bg-white text-dark fw-bold shadow-sm"
                                        : "bg-transparent text-white hover-bg-white-10"
                                }`}
                                onClick={() => { setActiveTab("submit-claim"); setErrorMsg(""); }}
                            >
                                <i className="pi pi-send me-2"></i> Submit Claim
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            <div className="pt-3 border-top border-white-10">
                <div className="d-flex align-items-center justify-content-between mb-3 px-2">
                    <span className="small text-white-50">Logged in: <strong>{username}</strong></span>
                </div>
                <button
                    className="btn btn-outline-light btn-sm w-100 py-2 d-flex align-items-center justify-content-center"
                    onClick={handleLogout}
                >
                    <i className="pi pi-sign-out me-2"></i> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
