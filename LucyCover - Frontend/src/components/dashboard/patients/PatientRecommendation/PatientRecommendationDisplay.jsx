import style from './css/PatientRecommendationDisplay.module.css'

import { useRef } from 'react';
import {useLoaderData} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import ToPrintPage from './ToPrintPage';

const PatientRecommendationDisplay = () => {

    const recommendationData = useLoaderData()
    const {recommendation,patientName} = recommendationData;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    return (
        <div className={style.Container}>
            <div className={style.HeaderBar}>
                <h5>{patientName}</h5>
                <button onClick={handlePrint}>Drukuj</button>
            </div>
            <ToPrintPage data={recommendation} ref={componentRef}/>
        </div>
    )
}

export default PatientRecommendationDisplay

