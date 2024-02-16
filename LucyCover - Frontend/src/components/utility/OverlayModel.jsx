import { createPortal } from "react-dom";
import style from './css/OverlayModel.module.css'

import { useDispatch } from "react-redux";
import { OverlayToggle } from "../../context/slices/OverlayModel_SLICE";

import {motion} from 'framer-motion'

const BackDrop = () => {

    const dispatch = useDispatch();

    return (
        <div className={style.backdrop} onClick={()=>dispatch(OverlayToggle(false))}>

        </div>
    )

}


const Model = ({children,title,OnQuitButtonClick,smallSize=false}) => {

    const dispatch = useDispatch();

    const defultQuitHandler = () => {
        dispatch(OverlayToggle(false))
    }

    const QuitButtonClickHandler = (OnQuitButtonClick !== undefined ? OnQuitButtonClick : defultQuitHandler);

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`${style.model} ${smallSize && style.small}`}>
            <div className={style.header}>
                <h1>{title}</h1>
                <button onClick={QuitButtonClickHandler}>Zamknij</button>
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

    return (
        <div>
            {createPortal(
                <BackDrop />,
                backDropDOM
            )}
            {createPortal(
                    <Model title={title} smallSize={smallSize} OnQuitButtonClick={OnQuitButtonClick}>
                        {children}
                    </Model>,
                modelDOM
            )}
        </div>
    )
}

export default OverlayModel