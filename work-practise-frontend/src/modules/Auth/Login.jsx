import { useNavigate } from "react-router-dom"

export default async function Login(e){
    const navigate = useNavigate()
    const jsonData = JSON.stringify(e)
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

            navigate("/main/" + data.user.email)
        }
        else alert("Пароль или логин не совпадают")

        if(response.status === 400) alert("Ошибка заполнения данных");
    }catch(error){
        alert("Ошибка: "+ error)
    }
}