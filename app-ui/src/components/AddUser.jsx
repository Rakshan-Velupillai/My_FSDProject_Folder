import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddUser = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [company, setCompany] = useState()

    const [smsg, setSmsg] = useState()
    const [emsg, setEmsg] = useState()
    const api = "https://jsonplaceholder.typicode.com/users"

    const navigate = useNavigate()

    const body = {
        name: name,
        email: email,
        phone: phone,
        company: company
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(body);
        try {
            const response = await axios.post(api, body)
            console.log(response)
            setEmsg("")
            setSmsg("User added")
            setName("")
            setEmail("")
            setPhone("")
            setCompany("")
        }
        catch (err) {
            console.log(err)
            setSmsg("")
            setEmsg("error")
            setName("")
            setEmail("")
            setPhone("")
            setCompany("")
        }

    }


    return (
        <div className="container">
            <h1 className="text-center mb-4">Add new User</h1>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    {

                        smsg ?
                            <div className="alert alert-success">
                                <p>{smsg}</p>
                            </div> : ""
                    }
                    {
                        emsg ?
                            <div className="alert alert-danger">
                                <p>{emsg}</p>
                            </div>
                            :
                            ""
                    }
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Phone</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                onChange={(e) => setPhone(e.target.value)} value={phone}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Company</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                onChange={(e) => setCompany(e.target.value)} value={company}/>
                        </div>
                        &nbsp;
                        <div >
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        &nbsp;
                        <div>
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddUser