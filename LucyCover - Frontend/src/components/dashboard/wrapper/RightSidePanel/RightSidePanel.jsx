import style from '../css/Wrapper.module.css'

import Avatar from '../../../../assets/images/avatar.png'

import UserDetails from './UserDetails'
import NotyficationsList from './NotyficationsList'
import NotyficationElement from './NotyficationElement'


const RightSidePanel = ({children}) => {
    return ( 
        <section id={style.RightSidePanel}>
            {children}
        </section>
    )
}
RightSidePanel.UserDetails = UserDetails
RightSidePanel.NotyficationsList = NotyficationsList
RightSidePanel.NotyficationElement = NotyficationElement
export default RightSidePanel