import { useState } from "react"
import Header from "../Header"
import Footer from "../Footer"
import Add from "../CRUD/Add"

export default function CompanyCreate(){
    const [companyName, setCompanyName] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")
    const [companyDesciption, setCompanyDesciption] = useState("")
    const [companyImage, setCompanyImage] = useState("")

    const user = localStorage.getItem("body")

    async function submitRegister(){
        if(!companyName || !companyEmail || !user.email)
        {
            return;
        }

        const formData = new FormData()
        formData.append("name", companyName)
        formData.append("corporateEmail", companyEmail)
        formData.append("dateofregistration", `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
        formData.append("author", user.email)
        formData.append("description", companyDesciption)
        formData.append("image", companyImage)

        const data = Object.fromEntries(formData)

        const tryAdd = await Add(dara, "https://localhost:7056/api/v1/users/register");

        if(tryAdd === false){
            alert("Произошла ошибка при создании команды, попробуйте позже")
            return;
        }
        
    }

    return(
        <>
        <Header />
        <main>
                <form className="authForm" id="login" onSubmit={(e) => {e.preventDefault()}}>
                    <div className="authLine">Регистрация команды</div>

                    <div className="authInput">
                        <input placeholder="Введите название команды" type="text" onChange={(e) => setCompanyName(e.target.value)} value={companyEmail}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите название почты" type="text" onChange={(e) => setCompanyEmail(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите описание команды (необязательно)" type="text" onChange={(e) => setCompanyDesciption(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите ссылку на лого (необязательно)" type="text" onChange={(e) => setCompanyImage(e.target.value)}/>
                    </div>

                    <button onClick={submitRegister} className="authButton">Зарегистрироваться</button>
                </form>
            </main>
            <Footer />
        </>
    )
}