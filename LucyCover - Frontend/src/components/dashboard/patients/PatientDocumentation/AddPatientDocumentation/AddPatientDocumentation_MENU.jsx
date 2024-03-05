import OverlayModel from "../../../../utility/OverlayModel"

import style from './css/AddPatientDocumentation_MENU.module.css'

const AddPatientDocumentation_MENU = () => {
    return (
        <OverlayModel title="Dodaj nową dokumentacje" smallSize={true}>
            <div className={style.Container}>
                <h3>Wybierz rodzaj wprowadzanej dokumentacji</h3>
                <div className={style.ButtonSection}>
                    <button id={style.FirstDocumentation} >Pierwszorazowa wizyta</button>
                    <button id={style.NextDocumentation} >Kolejna wizyta (domowa)</button>
                </div>
            </div>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_MENU