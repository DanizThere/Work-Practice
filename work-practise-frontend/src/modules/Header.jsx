import styles from '../style-modules/Header.module.css'

export default function Header(){
    const auth = localStorage.getItem("token")

    function checkRole(){
        if(!auth){
            
        }
    }

    return (
        <>
            <header>
                <div className={styles.header}>
                </div>
            </header>
        </>
    )
}