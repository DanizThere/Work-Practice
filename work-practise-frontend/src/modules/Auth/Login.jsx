export default async function Login(e){
    e.preventDefault();

    const formData = Object.fromEntries(new formData(document.getElementById("login")))
    if(!formData.email || !formData.password){
        alert("Не все поля заполнены")
        return;
    }
    try{
        const response = await fetch("https://localhost:7056/api/v1/users/login",{
            method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/json"},
                body: JSON.stringify(formData)
        })
        const data = await response.json()
        if(response.ok){
            localStorage.setItem("role", data.role)
            localStorage.setItem("body", JSON.stringify(data.user))
            localStorage.setItem("token", data.token)
        }
        else alert("Пароль или логин не совпадают")

        if(response.status === 400) alert("Ошибка заполнения данных");
    }catch(error){
        alert("Ошибка: "+ error)
    }
}