import { createPortal } from "react-dom";
import style from './css/OverlayModel.module.css'

import { useDispatch } from "react-redux";
import { OverlayToggle } from "../../context/slices/OverlayModel_SLICE";

import {motion} from 'framer-motion'

const BackDrop = ({onQuit}) => {
    return (
        <div className={style.backdrop} onClick={onQuit}>

        </div>
    )

}


const Model = ({children,title,onQuit,smallSize=false}) => {
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`${style.model} ${smallSize && style.small}`}>
            <div className={style.header}>
                <h1>{title}</h1>
                <button onClick={onQuit}>Zamknij</button>
            </div>
            <div className={style.content}>
                {children}
            </div>
        </motion.div>
    )
}

const OverlayModel = ({children,title,OnQuitButtonClick,smallSize}) => {
    const backDropDOM = document.querySelector('#backdrop');
    const modelDOM = document.querySelector('#model')

    const dispatch = useDispatch();

    const QuitHandler = () => {
        if(OnQuitButtonClick){
            OnQuitButtonClick()
        }
        dispatch(OverlayToggle(false))
    }

    return (
        <div>
            {createPortal(
                <BackDrop onQuit={QuitHandler} />,
                backDropDOM
            )}
            {createPortal(
                    <Model title={title} smallSize={smallSize} onQuit={QuitHandler}>
                        {children}
                    </Model>,
                modelDOM
            )}
        </div>
    )
}

export default OverlayModel