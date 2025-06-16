import styles from '../../style-modules/MainMenu/MainInfo.module.css'

export default function MainInfo(){

    return(
        <>
            <div className={styles.maininfo}>
                <div className={styles.info}>
                    <h2>Цветик - новый менеджер задач, созданный для прозрачности, и облегчения работы команды</h2>
                </div>
                <div className={styles.authorize}>
                    <p className={styles.authorizeTitle}>Корпоративная почта</p>
                    <input className={styles.authorizeInput} placeholder='Введите свою корпоративную почту' />
                    <button className={styles.authorizeBtn}>Зарегистрироваться</button>
                </div>
            </div>
        </>
    )
}