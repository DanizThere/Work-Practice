export default async function AddText(URL){
    try{
        const response = await fetch(URL,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });

        if(response.ok) return "is ok"
        if(response.status === 400) return "is error"
        if(response.status === 403) return "занято"
        return ""
    }catch(error){
        alert("Ошибка: " + error)
    }
}