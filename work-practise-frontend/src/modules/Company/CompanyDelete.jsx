import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Get from "../CRUD/Get"
import Header from "../Header"
import Footer from "../Footer"
import Delete from "../CRUD/Delete"

export default function CompanyDelete(){
    const user = localStorage.getItem("body")
    const [companyData, setCompanyData] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    async function getAsync(){
        const data = await Get("https://localhost:7056/api/v1/companies/delete/" + params.companyId)
        if(!data){
            alert("Данной команды нет")
            location.reload()
        }

        setCompanyData(data)
    }

    function tryDelete(){
        if(companyData.author !== user.email || user.role !== "admin"){
            navigate("/")
            return;
        }
        Delete("https://localhost:7056/api/v1/companies/delete/" + params.companyId)
    }

    useEffect(getAsync)

    return(
        <>
        <Header />
        <main>
            <div className="delete">
                <h4>Вы действительно хотите удалить команду?</h4>
                <div className="confirmDelete">
                    <button className="confirmDeleteBtn" onClick={tryDelete}>Удалить</button>
                    <button className="cancelDeleteBtn" onClick={() => navigate("/")}>Я передумал</button>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}