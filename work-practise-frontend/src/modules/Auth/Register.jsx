import nav from "react-router-dom"

export default function RegisterUser(e){
    e.preventDefault()
    const navigate = nav.useNavigate()
    const formData = Object.fromEntries(new FormData(document.getElementById('register')))
        if(!formData.name || !formData.email || !formData.password){
            alert("Не все поля заполнены")
            return;
        }

    Add(formData, 'https://localhost:7056/api/v1/users/register');
}