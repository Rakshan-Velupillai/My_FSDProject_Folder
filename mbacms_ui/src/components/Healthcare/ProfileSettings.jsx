import React from "react";

const ProfileSettings = ({
    editHealthcareName,
    setEditHealthcareName,
    editSpecialization,
    setEditSpecialization,
    editLicenseNumber,
    setEditLicenseNumber,
    editAddress,
    setEditAddress,
    editFullName,
    setEditFullName,
    editEmail,
    setEditEmail,
    editPhone,
    setEditPhone,
    handleUpdateProfile
}) => {
    return (
        <div className="row g-4 justify-content-center text-start">
            <div className="col-lg-8">
                <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                    <h4 className="fw-bold text-dark mb-1">Healthcare Profile Settings</h4>
                    <p className="text-secondary small mb-4">View and update your clinic details and authorized contact person credentials.</p>
                    
                    <form onSubmit={handleUpdateProfile}>
                        <h6 className="fw-bold text-primary mb-3 small tracking-wider">PROVIDER INFORMATION</h6>
                        
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Healthcare Name</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editHealthcareName}
                                    onChange={(e) => setEditHealthcareName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Specialization</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editSpecialization}
                                    onChange={(e) => setEditSpecialization(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">License Number</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editLicenseNumber}
                                    onChange={(e) => setEditLicenseNumber(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Clinic Address</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <h6 className="fw-bold text-primary mb-3 small tracking-wider">CONTACT PERSON CREDENTIALS</h6>
                        
                        <div className="row g-3 mb-4">
                            <div className="col-md-12">
                                <label className="form-label small fw-semibold text-secondary">Contact Full Name</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editFullName}
                                    onChange={(e) => setEditFullName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control p-2.5"
                                    required
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editPhone}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn text-white px-4 py-2.5 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                            style={{ background: "linear-gradient(135deg, #1e3a8a, #0d9488)", border: "none", borderRadius: "8px" }}
                        >
                            <i className="pi pi-save me-2"></i> Save Profile Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
