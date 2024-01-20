import {Row,Col} from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

import {motion} from 'framer-motion'


const MainMenuElement = ({title,children,className}) => {


    return (
        <motion.div 
            style={{backgroundColor:'#6c757d'}} 
            whileHover={{scale:1.1, backgroundColor:'#CB60C8', cursor: 'pointer'}} 
            transition={{type:'spring'}} 
            className={`col-sm-2 p-3 ${className}`}
            >
            <div className="row d-flex justify-content-center">
                <div className="col-xs-7 d-flex justify-content-center">
                    {children}
                </div>
                <div className='col-xs-12 text-center text-light mt-3'>
                   {title}
                </div>
            </div>
        </motion.div>
    )
}

export default MainMenuElement