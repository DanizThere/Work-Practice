export default async function Update(body, URL){
    const json = JSON.stringify(body);
    try{
        const response = await fetch(URL, {
            method: "PATCH",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: json
        })
        await response.json()
        if(response.status === 400) {
            alert("Ошибка заполнения данных")
            return false;
        }
        return true;
    }catch(error){
        alert("Ошибка " + error)
        return false;
    }
}