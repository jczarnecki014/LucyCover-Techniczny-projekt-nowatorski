//Componets
import { FaArrowAltCircleLeft } from "react-icons/fa";
//Style
import style from '../css/Wrapper.module.css'
//Hooks
import { useNavigate } from 'react-router-dom';
//Assets
import Logo from '../../../../assets/images/logo_graphics/logo_horizontal.png'

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