import OverlayModel from "../OverlayModel"

import style from '../css/PatientPopupMenu.module.css'

const PopupMenu = ({menuTitle,header,leftBtn,rightBtn}) => {


    return (
        <OverlayModel title={menuTitle} smallSize={true}>
            <div className={style.Container}>
                <h3>{header}</h3>
                <div className={style.ButtonSection}>
                    <button id={style.FirstOption} onClick={()=>leftBtn.func('FirstDocumentation')} >{leftBtn.desc}</button>
                    <button id={style.NextOption} onClick={()=>rightBtn.func('NextDocumentation')}>{rightBtn.desc}</button>
                </div>
            </div>
        </OverlayModel>
    )
}

export default PopupMenu