//Components
import PatientHeader from './PatientHeader';
import PatientName from './PatientName';
import PatientContact from './PatientContact';
import PatientChildrens from './PatientChildrens';
//Style
import style from './css/PatientDetails.module.css'

/**
 * PatientDetails - component to display patient basis personal details
 * 
 * Functionality: 
 * 
 *  [1] - Displaying patient bassis
 */

const PatientDetails = ({children}) => {
    
    return (
        <div className={style.PatientDetails}>
            {children}
        </div>
    )
}

PatientDetails.Header = PatientHeader
PatientDetails.NameSection = PatientName
PatientDetails.ContactSection = PatientContact
PatientDetails.ChildrenSection = PatientChildrens

export default PatientDetails