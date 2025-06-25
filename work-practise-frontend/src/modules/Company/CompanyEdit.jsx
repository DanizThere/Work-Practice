import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyEdit(){
    const user = localStorage.getItem("body")
    const [companyData, setCompanyData] = useState([])
    const [companyName, setCompanyName] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")
    const [companyDesciption, setCompanyDesciption] = useState("")
    const [companyImage, setCompanyImage] = useState("")
    const params = useParamsseParams()
    const navigate = useNavigate()

    async function getAsync(){
        const data = await Get("https://localhost:7056/api/v1/companies/delete/" + params.companyId)
        if(!data){
            alert("Данной команды нет")
            location.reload()
        }

        setCompanyData(data)
    }

    function tryUpdate(){
        const formData = new FormData()

        formData.append("name", companyName)
        formData.append("corporateEmail", companyEmail)
        formData.append("dateofregistration", companyData.dateofregistration)
        formData.append("author", companyData.author)
        formData.append("description", companyDesciption)
        formData.append("image", companyImage)
    }

    return(
        <>
        <Header />
        <main>
        <form className="authForm" id="login" onSubmit={(e) => {e.preventDefault()}}>
                    <div className="authLine">Изменение команды</div>

                    <div className="authInput">
                        <input placeholder="Введите название команды" type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyData.name}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите название почты" type="text" onChange={(e) => setCompanyEmail(e.target.value)} value={companyData.corporateEmail}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите описание команды (необязательно)" type="text" onChange={(e) => setCompanyDesciption(e.target.value)} value={companyData.description}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите ссылку на лого (необязательно)" type="text" onChange={(e) => setCompanyImage(e.target.value)} value={companyData.image}/>
                    </div>

                    <button onClick={tryUpdate} className="authButton">Изменить данные</button>
                </form>
        </main>
        <Footer />
        </>
    )
}