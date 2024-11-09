//Components
import ToPrintPage from './ToPrintPage';
//Style
import style from './css/PatientRecommendationDisplay.module.css'
//Hooks
import { useRef } from 'react';
import {useLoaderData} from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';


/**
 * PatientRecommendationDisplay - component to display choosen documentation, and print option
 * 
 * Functionality:
 * 
 *  [1] - Displaing recommendation details
 * 
 *  [2] - Print option display
 * 
 */

const PatientRecommendationDisplay = () => {
    const recommendationData = useLoaderData()
    const {date,patientFirstName,patientLastName,text,title} = recommendationData;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

   const patientName = `${patientFirstName} ${patientLastName}`
    return (
        <div className={style.Container}>
            <div className={style.HeaderBar}>
                <h5>{patientName}</h5>
                <button onClick={handlePrint}>Drukuj</button>
            </div>
            <ToPrintPage date={date} text={text} title={title} ref={componentRef}/>
        </div>
    )
}

export default PatientRecommendationDisplay

