import { useNavigate } from 'react-router-dom'
import styles from '../style-modules/Header.module.css'

export default function Header(){
    const navigate = useNavigate()
    const auth = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("body"))

    return (
        <>
            <header>
                <div className={styles.header}>
                    <div className={styles.toMainButton}>
                        <button onClick={() => navigate("/")}>На главную</button>
                    </div>

                    {!auth && <>
                        <div className={styles.toMainButton}>
                        <button onClick={() => navigate("/login")}>Авторизоваться</button>
                        |
                        <button onClick={() => navigate("/register")}>Зарегистрироваться</button>
                    </div>
                    </>}
                    {auth && <>
                        <div className={styles.toMainButton}>
                            <button onClick={() => navigate("/home/" + user.nickname)}>Личный кабинет</button>
                            |
                            <button onClick={() => {
                                localStorage.removeItem("token")
                                localStorage.removeItem("body")
                                location.reload()
                            }}>Выйти</button>
                        </div>
                        </>}
                </div>
            </header>
        </>
    )
}