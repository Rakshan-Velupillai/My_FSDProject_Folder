import React from "react";

const ProfileCompletionForm = ({
    dob,
    setDob,
    gender,
    setGender,
    address,
    setAddress,
    bloodGroup,
    setBloodGroup,
    handleProfileSubmit
}) => {
    return (
        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "16px" }}>
            <h4 className="fw-bold mb-3">Step 2: Profile Completion</h4>
            <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Date of Birth</label>
                    <input type="date" className="form-control p-2" required
                        value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Gender</label>
                    <select className="form-select p-2" required
                        value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Full Address</label>
                    <input type="text" className="form-control p-2" placeholder="Enter home address" required
                        value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Blood Group</label>
                    <select className="form-select p-2" required
                        value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
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
                <button type="submit" className="btn text-white w-100 py-2 fw-semibold" style={{ background: "linear-gradient(135deg, #2563eb, #14b8a6)" }}>
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileCompletionForm;
