import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"

import style from './css/AddPatientDocumentation_FIRST.module.css'

const AddPatientDocumentation_FIRST = () => {
    return (
        <OverlayModel title="Dodaj nową dokumentacje">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <section className={style.MotherPersonalData}>
                        <h5>Karta porady laktacyjnej</h5>
                        <h6>Dane matki</h6>
                        <hr />
                        <span>
                            <label>Imię</label>
                            <input />
                        </span>
                    </section>
                </div>
                <div className={style.LeftSide}>
                    right
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST