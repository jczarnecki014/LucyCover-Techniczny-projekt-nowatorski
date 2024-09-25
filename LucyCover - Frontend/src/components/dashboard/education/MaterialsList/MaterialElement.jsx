import style from '../css/Education.module.css'
import { motion } from 'framer-motion'

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