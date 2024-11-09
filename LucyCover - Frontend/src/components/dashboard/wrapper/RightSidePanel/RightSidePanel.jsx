//Componets
import UserDetails from './UserDetails'
import NotyficationsList from './NotyficationsList'
import ActionButtons from './ActionButtons'
//Style
import style from '../css/Wrapper.module.css'

/** 
* RightSidePanel - Component display right panel with user information, notyfications lisit and action button (manage/logout)
* Components:
* [1] - UserDetails - information about user as user name, role, avatar
* [2] - NotyficationsList - List with notyfication from system for example new message or required backup
*/

const RightSidePanel = ({children}) => {
    return ( 
        <section id={style.RightSidePanel}>
            {children}
        </section>
    )
}

RightSidePanel.UserDetails = UserDetails
RightSidePanel.NotyficationsList = NotyficationsList
RightSidePanel.ActionButtons = ActionButtons

export default RightSidePanel