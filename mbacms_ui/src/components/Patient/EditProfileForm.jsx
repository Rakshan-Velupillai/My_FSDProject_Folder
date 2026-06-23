import React from "react";

const EditProfileForm = ({
    profileDetails,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    editDob,
    setEditDob,
    editAddress,
    setEditAddress,
    editBloodGroup,
    setEditBloodGroup,
    handleUpdateProfile
}) => {
    return (
        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-start" style={{ maxWidth: "680px" }}>
            <h4 className="fw-bold text-dark mb-1">Edit Profile Details</h4>
            <p className="text-secondary small mb-4">Modify your registered user information and health details.</p>
            <form onSubmit={handleUpdateProfile}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Patient Code (Unique / Read-only)</label>
                        <input
                            type="text"
                            className="form-control p-2.5 bg-light fw-bold text-primary"
                            readOnly
                            value={profileDetails?.patientCode || ""}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Gender (Read-only)</label>
                        <input
                            type="text"
                            className="form-control p-2.5 bg-light"
                            readOnly
                            value={profileDetails?.gender || ""}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Full Name</label>
                    <input
                        type="text"
                        className="form-control p-2.5"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Contact Number</label>
                        <input
                            type="text"
                            className="form-control p-2.5"
                            required
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label small fw-semibold text-secondary">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control p-2.5"
                            required
                            value={editDob}
                            onChange={(e) => setEditDob(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Home Address</label>
                    <input
                        type="text"
                        className="form-control p-2.5"
                        required
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Blood Group</label>
                    <select
                        className="form-select p-2.5"
                        required
                        value={editBloodGroup}
                        onChange={(e) => setEditBloodGroup(e.target.value)}
                    >
                        <option value="">Select Blood Group...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary px-4 py-2.5 fw-semibold shadow-sm"
                    style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)", border: "none" }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfileForm;
