import {motion} from 'framer-motion'

import style from './css/ActionButton.module.css'


const ActionButton = ({children,className}) => {
    return (
        <motion.button whileHover={{scaleX:1.2 , cursor:'pointer'}} className={`${style.Action_Button} ${className}`}>
            {children}
        </motion.button>
    )
}

export default ActionButton