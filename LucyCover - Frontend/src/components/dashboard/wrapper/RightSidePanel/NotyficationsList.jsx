//Componets
import NotyficationElement from './NotyficationElement'
//Style
import style from '../css/Wrapper.module.css'

/** 
* NotyficationsList - Component to display system notyfication list for user.
* Components:
*
* [1] - NotyficationElement - component contain datails about notyfication
*/

const NotyficationsList = ({children}) => {
    return ( 
        <ul className={style.Notyfication}>
           {children}
        </ul>
    )
}

NotyficationsList.NotyficationElement = NotyficationElement;

export default NotyficationsList