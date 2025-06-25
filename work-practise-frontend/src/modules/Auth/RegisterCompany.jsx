export default async function RegisterCompany(e){
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(document.getElementById('register')))
        if(!formData.name || !formData.email || !formData.password){
            alert("Не все поля заполнены")
            return;
        }

    await Add(formData, 'https://localhost:7056/api/v1/companies/register');
}