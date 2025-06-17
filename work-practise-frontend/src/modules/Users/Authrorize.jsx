import { useState } from "react";
import Header from "../Header";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";

export default function Authorize(){
    const [type, setType] = useState("password")

    function changeType(){
        if(type === "password"){
            setType("text")
        }
        else setType("password")
    }

    return(
        <>
            <Header />
            <main>
                <form onSubmit={Login} className="authForm" id="login">
                    <div className="authTitle"><h3>Вход</h3></div>
                    <div className="authInput">
                        <input placeholder="Введите логин (почту)" type="text" name="email" />
                    </div>
                    <div className="authInput">
                        <input placeholder="Введите пароль" type={type} name="password"/>
                    </div>
                    <div className="authCheckBox">
                        <input type="checkBox" onChange={changeType}/>
                        <span>Показать пароль</span>
                    </div>

                    <button type="submit">Войти</button>

                    <div className="footerForm">
                        <div className="forgetPassword">
                            <Link to="/forgetpassword">Забыли пароль?</Link>
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