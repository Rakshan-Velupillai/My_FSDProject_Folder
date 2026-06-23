import React from "react"

const StatsCard = ({ title, value, subtext, icon, iconBg, onClick }) => {
    return (
        <div 
            className="card border-0 shadow-sm p-4 h-100" 
            style={{ borderRadius: "16px", backgroundColor: "#ffffff", cursor: onClick ? "pointer" : "default" }}
            onClick={onClick}
        >
            <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="text-secondary small fw-semibold">{title}</span>
                <div 
                    className="d-flex align-items-center justify-content-center" 
                    style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: iconBg, fontSize: "1.25rem" }}
                >
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="fw-bold text-dark mb-1">{value}</h3>
                <span className="text-muted small" style={{ fontSize: "0.8rem" }}>{subtext}</span>
            </div>
        </div>
    )
}

export default StatsCard