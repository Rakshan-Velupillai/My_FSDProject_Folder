import { useNavigate } from "react-router-dom"

const Home=()=>{

    const navigate = useNavigate()

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center"style={{ height: "100vh" }}>
            <h1 className="mb-4">User Management Dashboard</h1>

            <div className="col-md-4">
                <button className="btn btn-primary w-100 mb-3"
                    onClick={() => navigate('/user-list')}>
                    View User
                </button>

                <button className="btn btn-success w-100"
                    onClick={() => navigate('/add-user')}>
                    Add New User
                </button>
            </div>
        </div>
    )
}

export default Home