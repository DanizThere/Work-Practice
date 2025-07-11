export default function Delete(URL){
    fetch(URL,{
        method: "DELETE", 
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error()
        }   
        return true;         
    })
    .catch(error => {
        alert("Ошибка в подключении к серверу " + error)
        return false;
    })
}