import style from '../css/Wrapper.module.css'

import MenuItem from './MenuItem';



const MainMenu = ({children}) => {

    return (
        <nav id={style.Menu} className={style.GridElement}>
            {children}
        </nav>
    )
}

MainMenu.Item = MenuItem

export default MainMenu