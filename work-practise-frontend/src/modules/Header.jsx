import styles from '../style-modules/Header.module.css'

export default function Header({element}){
    return (
        <>
            <header>
                <div className={styles.header}>
                    {element}
                </div>
            </header>
        </>
    )
}