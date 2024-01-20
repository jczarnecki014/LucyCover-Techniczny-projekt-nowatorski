import { Fragment } from "react";
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

import style from './css/ModelsStyles.module.css'


const AuthButtons = ({MainButtonOption,ToggleButtonOption}) => {

    const navigate = useNavigate();

    const onToggleButtonClick = (event) => {
        event.preventDefault()
        navigate(ToggleButtonOption.togglePath)
    }

    return (
        <Fragment>
            <motion.button 
                initial={{x:-50,opacity:0}} 
                animate={{x:0,opacity:1,transition:{duration:1}}} 
                whileHover={{scale:1.1,backgroundColor:'#eee',color:'#CB60C8',borderColor:'#CB60C8',transition:{duration:0.2,type:'spring'}}}
                type="submit" 
                className={style.AuthActionButton}
                >
                    {MainButtonOption.buttonText}
                </motion.button>

            <motion.button 
            initial={{x:50,opacity:0}} 
            animate={{x:0,opacity:1,transition:{duration:1}}}  
            whileHover={{scale:1.1,backgroundColor:'#CB60C8',color:'#eee',transition:{duration:0.2,type:'spring'}}}
            type="submit" 
            className={style.AuthSwitchButton}
            onClick={onToggleButtonClick}
            >
                {ToggleButtonOption.buttonText}
            </motion.button>
        </Fragment>
    )
}

export default AuthButtons;