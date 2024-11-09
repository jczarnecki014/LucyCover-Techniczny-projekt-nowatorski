//Componets
import { Link } from "react-router-dom"
//Style
import style from '../css/Wrapper.module.css'
//Hooks
import { useSelector } from "react-redux"


const MenuItem = ({name,title,children}) => {
    const activePage = useSelector(state => state.mainMenu.activePage)
    const isActive = activePage === name

    return (
            <Link className={isActive ? style.active : ''} to={name}>
                {children}
                <h6>{title}</h6>
            </Link>
    )
}

export default MenuItem