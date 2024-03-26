import style from './css/PatientDocumentationDisplay.module.css'

import { useLoaderData } from 'react-router-dom';
import PatientDocumentationDisplay_FIRST from './PatientDocumentationDisplay_FIRST';
import PatientDocumentationDisplay_NEXT from './PatientDocumentationDisplay_NEXT';

const PatientDocumentationDisplay = () => {

    const documentation = useLoaderData()
    const {baby,date,first} = documentation.documentation

    return (
        <div className={style.Container}>
            <div className={style.TopBar}>
                <h6>{baby}</h6>
                <h6>{first ? 'Pierwsza wizyta' : 'Kolejna wizyta'}</h6>
                <h6>Wizyta: {date}</h6>
                <div className={style.ButtonSection}>
                    <button id={style.EditButton}>Modyfikuj</button>
                    <button id={style.DeleteButton}>Usuń</button>
                </div>
            </div>
            {
                first === true && <PatientDocumentationDisplay_FIRST formInputs={documentation.documentationDetails} />
            }
            {
                first === false && <PatientDocumentationDisplay_NEXT formInputs={documentation.documentationDetails} />
            }
        </div>
    )
}

export default PatientDocumentationDisplay