import { useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function Authorize(){
    const [type, setType] = useState("password")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function changeType(){

        if(type === "password"){
            setType("text")
        }
        else setType("password")
    }


    async function Login(){
        const formData = new FormData();
        formData.append("email", email)
        formData.append("password", password)

        const jsonData = JSON.stringify(Object.fromEntries(formData))
        try{
            const response = await fetch("https://localhost:7056/api/v1/users/login",{
                method: "POST",
                    headers: {"Accept": "application/json", "Content-Type": "application/json"},
                    body: jsonData
            })
            const data = await response.json()
            if(response.ok){
                localStorage.setItem("role", data.role)
                localStorage.setItem("body", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)

                navigate("/home/" + data.user.nickname)
            }
            else alert("Пароль или логин не совпадают")

            if(response.status === 400) alert("Ошибка заполнения данных");
        }catch(error){
            alert("Ошибка: "+ error)
        }
}

    return(
        <>
            <Header />
            <main>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    Login()
                }} className="authForm" id="login">
                    <div className="authTitle"><h3>Вход</h3></div>
                    <div className="authInput">
                        <input placeholder="Введите логин (почту)" type="text" name="email" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите пароль" type={type} name="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="authCheckBox">
                        <input type="checkBox" onChange={changeType}/>
                        <span>Показать пароль</span>
                    </div>

                    <button type="submit">Войти</button>

                    <div className="footerForm">
                        <div className="forgetPassword">
                            <Link to="forgetpassword">Забыли пароль?</Link>
                        </div>
                        <div className="register">
                            <Link to="/register">Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}