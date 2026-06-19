import axios from "axios"
import { useEffect, useState } from "react"

const UserList=()=>{

    const getApi="https://jsonplaceholder.typicode.com/users"
    const [user,setUser]=useState([])

    useEffect(()=>{

        const fetchUser=async ()=>{
        try{
            const response=await axios.get(getApi)
            console.log(response.data)
            setUser(response.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchUser()
    },[])

    
    
    const del=async(id)=>{
        try{
            const deleteApi= `https://jsonplaceholder.typicode.com/users/${id}`
            await axios.delete(deleteApi)

            const list=user.filter(u=>u.id!==id)
            
            setUser(list)
        }
        catch(err){
            console.log(err)
        }

    }

    return(
        <div className="container">
            <div className="row mt-4">
            <h1>User List</h1>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-9">
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">s.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((user, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.company.name}</td>
                                <td>
                                    <button className="btn btn-danger"
                                    onClick={()=> del(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
            <div className="col-md-4"></div>
        </div>
    )
}
export default UserList