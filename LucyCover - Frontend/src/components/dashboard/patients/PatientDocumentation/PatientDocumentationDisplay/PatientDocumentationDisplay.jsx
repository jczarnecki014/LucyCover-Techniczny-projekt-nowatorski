import style from './css/PatientDocumentationDisplay.module.css'

import { useLoaderData } from 'react-router-dom';
import PatientDocumentationDisplay_FIRST from './PatientDocumentationDisplay_FIRST';

const PatientDocumentationDisplay = () => {

    const XXX = useLoaderData()
    console.log(XXX)
    return (
        <div className={style.Container}>
            <div className={style.TopBar}>
                <h6>Barbara Kret</h6>
                <h6>Kolejna wizyta</h6>
                <h6>Wizyta: 20.12.2023</h6>
                <div className={style.ButtonSection}>
                    <button id={style.EditButton}>Modyfikuj</button>
                    <button id={style.DeleteButton}>Usuń</button>
                </div>
            </div>
            {
                XXX.first && <PatientDocumentationDisplay_FIRST formInputs={XXX.documentationDetails} />
            }
            {
                XXX.first === false && <PatientDocumentationDisplay_FIRST formInputs={XXX.documentationDetails} />
            }
        </div>
    )
}

export default PatientDocumentationDisplay