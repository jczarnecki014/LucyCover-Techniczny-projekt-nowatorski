//Component
import { motion } from 'framer-motion'
//Style
import style from '../css/Education.module.css'

/**
 * MaterialElement - Component contain info about file date and title 
 * 
 * MaterialList <- Education <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Contain info about file
 * 
 *  Params:
 * 
 *  @param {bool} active - boolen indicates the current materialElement is selected
 * 
 *  @param {function} onClick - Function to set materialElement as selected
 */

const MaterialElement = ({active,date,title,onClick}) => {
    return (
            <motion.tr 
                whileHover={{fontSize:'18px', transition:{duration: 0.1}}} 
                onClick={onClick} 
                className={active ? style.active : ""}
                >
                    <td>{date}</td>
                    <td colSpan={2}>{title}</td>
            </motion.tr>
    )
}

export default MaterialElement