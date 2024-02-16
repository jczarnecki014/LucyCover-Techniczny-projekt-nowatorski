import style from '../css/Wrapper.module.css'

const NotyficationsList = ({children}) => {
    return ( 
        <ul className={style.Notyfication}>
           {children}
        </ul>
    )
}

export default NotyficationsList