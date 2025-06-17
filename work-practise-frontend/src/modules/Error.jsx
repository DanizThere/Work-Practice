import { useNavigate } from "react-router-dom"
import styles from "../style-modules/Error.module.css"

export default function Error(){
    const navigate = useNavigate()
    return(
        <>
            <div className={styles.error}>
            <h1 className={styles.errorH1}>404 Not Found</h1>
            <h3 className={styles.errorH3}>Нам очень жаль, что вы не смогли попасть туда, куда хотели :{"("}</h3>
            <button className={styles.errorButton} onClick={() => navigate("main")}>Возвращайтесь в изведанную область</button>
            </div>
        </>
    )
}