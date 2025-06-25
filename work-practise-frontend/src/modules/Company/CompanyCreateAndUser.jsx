import { useEffect, useState } from "react"
import Get from "../CRUD/Get"
import Add from "../CRUD/Add"
import Header from "../Header"
import Footer from "../Footer"

export default function CompanyCreateAndUser(){
    const [email, setEmail] = useState("")
    const [fpassword, setFpassword] = useState("")
    const [spassword, setSpassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [nickname, setNickname] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")
    const [companyDesciption, setCompanyDesciption] = useState("")
    const [companyImage, setCompanyImage] = useState("")

    const [type, setType] = useState("password")

    function changeType(){
        if(type === "password"){
            setType("text")
        }
        else setType("password")
    }

    const storageCompanyEmail = localStorage.getItem("companyEmail") 

    async function SubmitRegister(){

        if(checkEmail(email) == false) {
            alert("Данная почта либо уже зарегистрирована либо пустая строка. Попробуйте другую")
            return;
        }

        if(fpassword !== spassword){
            alert("Ваш пароль не совпадает")
            return;
        }

        if(!email || !fpassword || !companyName || !companyEmail || !nickname){
            alert("Поля не заполнены")
            return;
        }

        const formDataUser = new FormData();
        const formDataCompany = new FormData();

        formDataUser.append("email", email)
        formDataUser.append("password", fpassword)
        formDataUser.append("name", name)
        formDataUser.append("nickname", nickname)
        formDataUser.append("role", "user")
        formDataUser.append("lastname", lastname)

        const userData = Object.fromEntries(formDataUser)

        const tryAddUser = await Add(userData, "https://localhost:7056/api/v1/users/register")

        if(tryAddUser === false){
            alert("Произошла ошибка при создании пользователя, попробуйте заново")
            return;
        }
        
        const date = new Date();

        formDataCompany.append("name", companyName)
        formDataCompany.append("corporateemail", companyEmail)
        formDataCompany.append("dateofregistration", `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`) 
        formDataCompany.append("description", companyDesciption)
        formDataCompany.append("author", email)
        formDataCompany.append("image", companyImage)

        const companyData = Object.fromEntries(formDataCompany)
        const tryAddCompany = await Add(companyData, "https://localhost:7056/api/v1/companies/register")
        if(tryAddCompany === false){
            alert("Произошла ошибка при создании команды, попробуйте заново")
            return;
        }
    }

    function checkEmail(e){
        const email = Get("https://localhost:7056/api/v1/users/tryget/" + e)
        if(email) return false;

        return true;
    }

    function setStorageEmail(){
        if(!storageCompanyEmail) return "";
        
        localStorage.removeItem("companyEmail")
        return storageCompanyEmail;
    }

    useEffect(() => {
        setCompanyEmail(setStorageEmail)
    }, [])

    return(
        <>
        <Header />
        <main>
                <form className="authForm" id="login" onSubmit={(e) => {e.preventDefault()}}>
                <div className="authLine">Регистрация пользователя</div>

                    <div className="authTitle"><h3>Регистрация</h3></div>
                    <div className="authInput">
                        <input placeholder="Введите логин (почту)" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите пароль" type={type} onChange={(e) => setFpassword(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Повторите пароль" type={type} onChange={(e) => setSpassword(e.target.value)}/>
                    </div>
                    <div className="authCheckBox">
                        <input type="checkBox" onChange={changeType}/>
                        <span>Показать пароль</span>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите имя (необязательно)" type="text" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите фамилию (необязательно)" type="text" onChange={(e) => setLastname(e.target.value)}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите никнейм" type="text" onChange={(e) => setNickname(e.target.value)}/>
                    </div>

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

                    <button onClick={SubmitRegister} className="authButton">Зарегистрироваться</button>
                </form>
            </main>
            <Footer />
        </>
    )
}