//Components
import OverlayModel from "../OverlayModel"
//Style
import style from '../css/PatientPopupMenu.module.css'

/**
 * Popup Menu - preconfigured popup component to display base menu dialog.
 * This component should be use when some stream of application require make a decision and invoke difrent function
 * 
 * Props:
 * 
 * @param {string} menuTitle - Title of popup
 * @param {string} header - Main information about menu 
 * @param {object} leftBtn - object to config [1] button - it takes object as {func: Function, desc:"btn description"}
 * @param {string} rightBtn - object to config [2] button - it takes object as {func: Function, desc:"btn description"}
 * @param {boolean} isPending - boolen to pass information about some processing. When some function proccesing for example api request 
 popupMenu display information about it ( when isPending = true)
 * @returns 
 */

const PopupMenu = ({menuTitle,header,leftBtn,rightBtn,isPending}) => {

    return (
        <OverlayModel title={menuTitle} smallSize={true}>
            <div className={style.Container}>
                <h3>{header}</h3>
                <div className={style.ButtonSection}>
                    <button id={style.FirstOption} onClick={()=>leftBtn.func('FirstDocumentation')} >{leftBtn.desc}</button>
                    <button id={style.NextOption} onClick={()=>rightBtn.func('NextDocumentation')}>{rightBtn.desc}</button>
                </div>
                {
                    isPending && 
                        <p style={{color:"#D00"}}>Proszę czekać, trwa połączenie..</p>
                }               
            </div>
        </OverlayModel>
    )
}

export default PopupMenu