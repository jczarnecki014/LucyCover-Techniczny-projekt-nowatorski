import { useSelector } from "react-redux"
import style from '../css/Wrapper.module.css'

const MenuItem = ({name,title,children}) => {
    const activePage = useSelector(state => state.mainMenu.activePage)
    const isActive = activePage === name
    console.log(activePage)
    return (
            <span className={isActive ? style.active : ''}>
                {children}
                <h6>{title}</h6>
            </span>
    )
}

export default MenuItem