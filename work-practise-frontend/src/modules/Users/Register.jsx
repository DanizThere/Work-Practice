import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Add from "../CRUD/Add";

export default function Register(){
    const [email, setEmail] = useState("")
    const [fpassword, setFpassword] = useState("")
    const [spassword, setSpassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [nickname, setNickname] = useState("")

    const [type, setType] = useState("password")

    function changeType(){
        if(type === "password"){
            setType("text")
        }
        else setType("password")
    }

    async function submitRegister(){
        if(!email || !fpassword || !nickname){
            return;
        }   

        const formDataUser = new FormData();

        formDataUser.append("email", email)
        formDataUser.append("password", fpassword)
        formDataUser.append("name", name)
        formDataUser.append("nickname", nickname)
        formDataUser.append("role", "user")
        formDataUser.append("lastname", lastname)

        const userData = Object.fromEntries(formDataUser)
        if(await Add(userData, "https://localhost:7056/api/v1/users/register") === false){
            alert("Произошла ошибка при создании пользователя, попробуйте заново")
            return;
        }
    }

    useEffect(changeType)

    return(
        <>
        <Header />
        <main>
                <form className="authForm" id="login" onSubmit={(e) => {e.preventDefault()}}>
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
                    <button onClick={submitRegister} className="authButton">Зарегистрироваться</button>
                </form>
            </main>
        <Footer />
        </>
    )
}