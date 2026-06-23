import React from "react";

const Sidebar = ({
    activeTab,
    setActiveTab,
    username,
    handleLogout,
    setErrorMsg,
    setSuccessMsg
}) => {
    return (
        <div className="p-3 text-white d-flex flex-column justify-content-between" style={{ width: "280px", background: "linear-gradient(135deg, #1e3a8a, #0d9488)" }}>
            <div>
                <div className="d-flex align-items-center mb-4 pb-2 border-bottom border-white-20">
                    <i className="pi pi-heart-fill me-2 fs-4 text-teal-300"></i>
                    <span className="fs-5 fw-bold text-white tracking-wider">CareAssist Provider</span>
                </div>
                <ul className="nav nav-pills flex-column gap-2">
                    <li className="nav-item">
                        <button
                            className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                activeTab === "invoices"
                                    ? "bg-white text-dark fw-bold shadow-sm"
                                    : "bg-transparent text-white hover-bg-white-10"
                            }`}
                            onClick={() => { setActiveTab("invoices"); setErrorMsg(""); setSuccessMsg(""); }}
                        >
                            <i className="pi pi-file-excel me-2"></i> Invoices Ledger
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                activeTab === "generate"
                                    ? "bg-white text-dark fw-bold shadow-sm"
                                    : "bg-transparent text-white hover-bg-white-10"
                            }`}
                            onClick={() => { setActiveTab("generate"); setErrorMsg(""); setSuccessMsg(""); }}
                        >
                            <i className="pi pi-plus-circle me-2"></i> Generate Invoice
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link w-100 text-start border-0 py-2.5 px-3 rounded transition-all d-flex align-items-center ${
                                activeTab === "profile"
                                    ? "bg-white text-dark fw-bold shadow-sm"
                                    : "bg-transparent text-white hover-bg-white-10"
                            }`}
                            onClick={() => { setActiveTab("profile"); setErrorMsg(""); setSuccessMsg(""); }}
                        >
                            <i className="pi pi-user me-2"></i> My Profile
                        </button>
                    </li>
                </ul>
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
