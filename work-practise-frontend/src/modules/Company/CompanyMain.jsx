import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useEffect, useState } from "react";
import Get from "../CRUD/Get";

export default function CompanyMain(){
    const [company, setCompany] = useState([])
    const [users, setUsers] = useState([])
    const companyId = useParams()

    async function getCompany(){
        const data = await Get("https://localhost:7056/api/v1/companies/" + companyId.companyId)
        const usersData = await Get("https://localhost:7056/api/v1/users/state/" + companyId.companyId)
        if(!data || !usersData) {
            alert("Ошибка при загрузке данных")
            location.reload()
        }

        setCompany(data)
        setUsers(usersData)
    }

    useEffect(() => getCompany, [])

    return(
        <>
        <Header />
            <div className="CompanyInfo">
                <div className="CompanyMainInfo">
                    <h3 className="CompanyTitle">{company.name}</h3>

                    <h4 className="CompanyAuthor">{company.author}</h4>
                </div>
                <div className="CompanyDescription">
                    {users.map(x => <div className="CompanyUsers" key={x.name}>
                        <img src={x.image} className="CompanyUserImage"/>
                        <Link to={`/home/${x.nickname}`} className="CompanyUserName">{x.nickname}</Link>
                    </div>)}
                </div>
            </div>
        <Footer />
        </>
    )
}