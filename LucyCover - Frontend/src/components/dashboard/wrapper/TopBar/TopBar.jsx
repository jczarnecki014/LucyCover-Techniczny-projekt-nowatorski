import style from '../css/Wrapper.module.css'

import Logo from '../../../../assets/images/logo_graphics/logo_horizontal.png'
import { FaArrowAltCircleLeft } from "react-icons/fa";

const TopBar = () => {
    return (
        <div id={style.TopBar} className={style.GridElement}>
            <img src={Logo} />
            <span className={style.BackButton}>
                <FaArrowAltCircleLeft/>
            </span>
        </div>
    )
}

export default TopBar