//Components
import OverlayModel from "./OverlayModel"
import { TiWarningOutline } from "react-icons/ti";
import { SlHeart } from "react-icons/sl";
import { FaRegSadTear } from "react-icons/fa";
import { Fragment } from "react";
//Style
import style from './css/Popup.module.css'

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

/** 
* Popup - component to display short system information. Usualy it is use to return status of task processing (success,error,)
*
* Functionality:
*
* [1] - Displaying short information about processing status
*
* Params:
* @param {string} type - type of information. Option have to be on of them:  "success", "error", "warning"
*
* @param {string} title - Title of displayed window
*
* @param {string} description - information which will be displayed. Some description of processing status
*
* @param {string} additionalInfo - some highlighted information, for example some advices of fixing problem.
*
* @param {function} CancleAction - if function is provided, popup displays button to deny some operation. "No" button
*
* @param {function} AcceptAction - if function is provided, popup displays button to accept some operation. "Ok" button
*
*/

const Popup = ({type,title,description,additionalInfo,CancleAction,AcceptAction}) => {
    return (
        <OverlayModel title={title} smallSize={true}>
            <div className={style.PopupContainer}>
                {GetContentByType(type)}
                <p>{description}</p>
                <p style={{color:'#D00000',fontWeight:"bold"}}>{additionalInfo}</p>
                <div className={style.ButtonSection}>
                    {AcceptAction && <button id={style.MainButton} onClick={()=>AcceptAction()}>Ok</button> }
                    {CancleAction && <button onClick={()=>CancleAction()}>Nie</button>}
                </div>
            </div>
        </OverlayModel>
    )
}

export default Popup