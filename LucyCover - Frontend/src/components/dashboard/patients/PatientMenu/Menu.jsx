//Components
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdRecommend } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
//Style
import style from './css/PatientMenu.module.css'
//Hooks
import { Link } from 'react-router-dom';

/**
 * Menu - component to display patient menu tails
 * 
 * Functionality: 
 * 
 *  [1] - Displaying menu options
 * 
 *  [2] - Navigation between pages
 * 
 *  [3] - Toggling form to edit patient details
 * 
 *  Params:
 * 
 *  @param {function} ShowPatientFormToggler - function to dipslay patient add/edit form
 */

const Menu = ({ShowPatientFormToggler}) => {
    return (
        <div className={style.Container}>
            <Link id={style.Documentation} className={style.Tails} to="documentation">
                <IoDocumentTextOutline />
                <h5>Dokumentacja</h5>
            </Link>
            <Link id={style.Recomendation} className={style.Tails} to="recommendation">
                <MdRecommend />
                <h5>Zalecenia</h5>
            </Link>
            <Link id={style.Visits} className={style.Tails} to="schedule">
                <IoCalendar />
                <h5>Wizyty</h5>
            </Link>
            <div id={style.Manage} className={style.Tails} onClick={ShowPatientFormToggler}>
                <RiUserSettingsLine />
                <h5>Zarządzaj</h5>
            </div>
        </div>
    )
}

Menu.Option = Option;

export default Menu