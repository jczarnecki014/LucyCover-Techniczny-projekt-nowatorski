import style from '../css/Wrapper.module.css'

import Logo from '../../../../assets/images/logo_graphics/logo_horizontal.png'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const TopBar = () => {

    const navigate = useNavigate()

    return (
        <div id={style.TopBar} className={style.GridElement}>
            <img src={Logo} />
            <span className={style.BackButton} onClick={()=>navigate(-1)}>
                <FaArrowAltCircleLeft/>
            </span>
        </div>
    )
}

export default TopBar