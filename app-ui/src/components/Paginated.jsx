import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "../store/action/pageAction"

const Paginated=()=>{

    const [currentPage, setCurrentPage] = useState(1)
    // const [list, setList] = useState([])
    // const [pageCount, setPageCount] = useState()
    //  limit = 20
    // const [arr,setArr]=useState([])

const dispatch = useDispatch()

const list=useSelector(state=>state.page.list)

const pageCount=useSelector(state=>state.page.pageCount)

const arr = Array.from({ length: pageCount})

    // const api = `https://rickandmortyapi.com/api/character/?page=${currentPage}`

    // https://rickandmortyapi.com/api/character/?page=
    // useEffect(() => {

    //     const fetchList = async () => {
    //         try {
    //             const response = await axios.get(api)
    //             setList(response.data.results)
    //             setPageCount(response.data.info.pages)
    //             console.log(list)
    //             console.log(response.data)
    //             setArr(Array.from({length:pageCount}))
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchList()

    // }, [currentPage])


    useEffect(() => {
    dispatch(getAllData(currentPage))
}, [currentPage])

    return (
        <div className="container-fluid p-4">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Species</th>
                        <th>Origin</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((l, index) => (
                            <tr key={index}>
                                <td>{l.name}</td>
                                <td>{l.status}</td>
                                <td>{l.species}</td>
                                <td>{l.origin.name}</td>
                                <td>{l.location.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>


                    {
                        arr.map((_, index) => (
                            <li key={index} className="page-item"><button className="page-link" onClick={() => setCurrentPage(index+1)}>{index}</button></li>
                        ))
                    }

                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === pageCount} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Paginated