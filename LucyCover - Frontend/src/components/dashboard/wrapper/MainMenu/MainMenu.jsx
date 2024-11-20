//Componets
import MenuItem from './MenuItem';
//Style
import style from '../css/Wrapper.module.css'

/** 
* MainMenu - Component to displaying  main menu
* 
* @param
* children - menuItem components 
*
*/

const MainMenu = ({children}) => {

    return (
        <nav id={style.Menu} className={style.GridElement}>
            {children}
        </nav>
    )
}

MainMenu.Item = MenuItem

export default MainMenu