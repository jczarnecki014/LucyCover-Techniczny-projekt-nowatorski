import { Fragment } from "react";
import {motion} from 'framer-motion'

import style from './css/ModelsStyles.module.css'


const AuthButtons = ({MainButtonText,ToggleButtonText,onAuthButtonClick, onAuthModeToggleButtonClick}) => {
    return (
        <Fragment>
            <motion.button 
                initial={{x:-50,opacity:0}} 
                animate={{x:0,opacity:1,transition:{duration:1}}} 
                whileHover={{scale:1.1,backgroundColor:'#eee',color:'#CB60C8',borderColor:'#CB60C8',transition:{duration:0.2,type:'spring'}}}
                type="submit" 
                className={style.AuthActionButton}
                >
                    {MainButtonText}
                </motion.button>

            <motion.button 
            initial={{x:50,opacity:0}} 
            animate={{x:0,opacity:1,transition:{duration:1}}}  
            whileHover={{scale:1.1,backgroundColor:'#CB60C8',color:'#eee',transition:{duration:0.2,type:'spring'}}}
            type="submit" 
            className={style.AuthSwitchButton}
            >
                {ToggleButtonText}
            </motion.button>
        </Fragment>
    )
}

export default AuthButtons;