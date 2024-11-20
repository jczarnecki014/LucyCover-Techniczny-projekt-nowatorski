//Componet
import {motion} from 'framer-motion'
//Style
import style from './css/OverlayModel.module.css'
//Hooks
import { useDispatch } from "react-redux";
//Slice
import { OverlayToggle } from "../../context/slices/OverlayModel_SLICE";
//Additional
import { createPortal } from "react-dom";



const BackDrop = ({onQuit}) => {
    return (
        <div className={style.backdrop} onClick={onQuit}>

        </div>
    )

}

const Model = ({children,title,onQuit,smallSize=false,funcButton}) => {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`${style.model} ${smallSize && style.small}`}>
            <div className={style.header}>
                <h1>{title}</h1>
                <div className={style.buttonSection}>
                    {
                        funcButton && <button onClick={funcButton.func}>{funcButton.btnLabel}</button> 
                    }
                    <button onClick={onQuit}>Zamknij</button>
                </div>
            </div>
            <div className={style.content}>
                {children}
            </div>
        </motion.div>
    )
}

/**
 * Component overlaying content and displaying value over screen
 * @param {string} title - display title of this popup
 * @param {Function} OnQuitButtonClick - function running after popup close
 * @param {babel} smallSize - showing small version of popup 
 * @param {Object} funcButton - Object to configure additional action button
 */

const OverlayModel = ({children,title,OnQuitButtonClick,smallSize,funcButton}) => {
    const backDropDOM = document.querySelector('#backdrop');
    const modelDOM = document.querySelector('#model')

    const dispatch = useDispatch();

    const QuitHandler = () => {
        if(OnQuitButtonClick){
            OnQuitButtonClick()
        }
        else {
            dispatch(OverlayToggle(false))
        }
    }

    return (
        <div>
            {createPortal(
                <BackDrop onQuit={QuitHandler} />,
                backDropDOM
            )}
            {createPortal(
                    <Model title={title} smallSize={smallSize} onQuit={QuitHandler} funcButton={funcButton}>
                        {children}
                    </Model>,
                modelDOM
            )}
        </div>
    )
}

export default OverlayModel