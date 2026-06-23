import React from "react";

const ProfileSettings = ({
    editCompanyName,
    setEditCompanyName,
    editRegNo,
    setEditRegNo,
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
        <div className="row justify-content-center text-start">
            <div className="col-lg-8">
                <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                    <h4 className="fw-bold text-dark mb-1">Company Profile Settings</h4>
                    <p className="text-secondary small mb-4">Update organization profile records and contact information details.</p>

                    <form onSubmit={handleUpdateProfile}>
                        <h6 className="fw-bold text-primary mb-3 small tracking-wider">ORGANIZATION DETAILS</h6>
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Insurance Company Name</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editCompanyName}
                                    onChange={(e) => setEditCompanyName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Registry Registration No</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editRegNo}
                                    onChange={(e) => setEditRegNo(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label small fw-semibold text-secondary">Headquarters Address</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <h6 className="fw-bold text-primary mb-3 small tracking-wider">AUTHORIZED REPRESENTATIVE</h6>
                        <div className="row g-3 mb-4">
                            <div className="col-md-12">
                                <label className="form-label small fw-semibold text-secondary">Representative Full Name</label>
                                <input
                                    type="text"
                                    className="form-control p-2.5"
                                    required
                                    value={editFullName}
                                    onChange={(e) => setEditFullName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Representative Email</label>
                                <input
                                    type="email"
                                    className="form-control p-2.5"
                                    required
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-semibold text-secondary">Representative Phone Number</label>
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
                            style={{ background: "linear-gradient(135deg, #4f46e5, #0891b2)", border: "none", borderRadius: "8px" }}
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
