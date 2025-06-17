import { useState } from 'react'
import styles from '../../style-modules/MainMenu/MainInfo.module.css'
import AddText from "../CRUD/AddText.jsx"
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MainInfo(){
    const [data, setData] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();

    async function checkEmail(){
        if(!EMAIL_REGEXP.test(data)){
            alert("Это не почта")
            return;
        }
        const response = await AddText("https://localhost:7056/api/v1/companies/trycreate/" + data)
        if(response === "is ok") {
            localStorage.setItem('companyEmail', data)
            navigate("/company/create")
            return;
        }
        setSuccess(response)
    }

    return(
        <>
            <div className={styles.maininfo}>
                <div className={styles.info}>
                    <h2>Цветик - новый менеджер задач, созданный для прозрачности, и облегчения работы команды</h2>
                </div>
                <div className={styles.authorize}>
                    <p className={styles.authorizeTitle}>Корпоративная почта</p>
                    <input className={styles.authorizeInput} placeholder='Введите свою корпоративную почту' type="email" onChange={(e) => setData(e.target.value)}/>
                    <p className={styles.check}>{success}</p>
                    <button className={styles.authorizeBtn} onClick={checkEmail}>Зарегистрироваться</button>
                </div>
            </div>
        </>
    )
}