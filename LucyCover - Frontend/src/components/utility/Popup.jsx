import OverlayModel from "./OverlayModel"

import style from './css/Popup.module.css'

import { TiWarningOutline } from "react-icons/ti";
import { SlHeart } from "react-icons/sl";
import { FaRegSadTear } from "react-icons/fa";

import { Fragment } from "react";

const GetContentByType = (type) => {
    if(type === 'warning'){
        return (
            <Fragment>
                <TiWarningOutline size={100} color="#FFB800" />
                <h2>Ostrzeżenie</h2>
            </Fragment>
        )
    }
    else if (type === 'success'){
        return (
            <Fragment>
                <SlHeart size={100} color="#3FA91A" />
                <h2>Udało się !</h2>
            </Fragment>
        )
    }
    else if (type === 'error'){
        return (
            <Fragment>
                <FaRegSadTear size={100} color="#D00000" />
                <h2>Mamy problem...</h2>
            </Fragment>
        )
    }
}

const Popup = ({type,description,CancleAction,AcceptAction}) => {
    return (
        <OverlayModel smallSize={true}>
            <div className={style.PopupContainer}>
                {GetContentByType(type)}
                <p>{description}</p>
                <div className={style.ButtonSection}>
                    {AcceptAction && <button id={style.MainButton} onClick={()=>AcceptAction()}>Ok</button> }
                    {CancleAction && <button onClick={()=>CancleAction()}>Nie</button>}
                </div>
            </div>
        </OverlayModel>
    )
}

export default Popup