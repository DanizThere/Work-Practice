import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Get from "../CRUD/Get";
import { useEffect, useState } from "react";

export default function Home(){
    const [user, setUser] = useState([])
    const [companies, setCompanies] = useState([])
    const params = useParams()

    async function getUser(){
        const data = await Get("https://localhost:7056/api/v1/users/" + params.userId)
        const companyData = await Get("https://localhost:7056/api/v1/companystates/user/" + params.userId)
        if(!data || !companyData){
            alert("Ошибка при загрузке данных")
            location.reload()
        }

        setUser(data)
        setCompanies(companyData)
    }

    useEffect(() => getUser, [])

    return(
        <>
        <Header />
            <main>
                <div className="userPage">
                    <img src="" alt="" className="userImage" />

                    <h3>{user.nickname}</h3>
                    <p>{user.lastname} {user.name}</p>
                </div>
                <div className="userCompanies">
                    {companies && <>
                        <h2>Команды:</h2>
                        {companies.map(c => <div key={c.name}>
                            
                            <Link to={`/home/company/${c.name}`}>{c.name}</Link>
                        </div>)}
                    </>}
                </div>
            </main>
        <Footer />
        </>
    )
}