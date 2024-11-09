//Components
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import MainMenu from './MainMenu/MainMenu';
import TopBar from './TopBar/TopBar'
import RightSidePanel from './RightSidePanel/RightSidePanel';
//Style
import style from './css/Wrapper.module.css'
//Assets
import Avatar from '../../../assets/images/avatar.png'
import { DUMMY_NOTYFICATIONS } from '../../../assets/DUMMY_DATA/DUMMY_NOTYFICATIONS';
import NotyficationsList from "./RightSidePanel/NotyficationsList";

/** 
* Wrapper - Component work as a wrapper for every pages. This component defines elements as main top bar, main menu, right side panel
* 
* Functionality:
*
* [1] - Keeping app pages in specified template
*
* [2] - Displaying notyfication
*
*/

const Wrapper = ({children}) => {
    return ( 
        <div className={style.GridContainer}>
            <TopBar />

            <MainMenu id={style.Menu} className={style.GridElement}>
                <MainMenu.Item title='Kalendarz wizyt' name="schedule">
                    <IoCalendarNumberOutline size={40} />
                </MainMenu.Item>
                <MainMenu.Item title='Pacjenci' name="patients">
                    <FaUsers size={40}/>
                </MainMenu.Item>
                <MainMenu.Item title='Materiały eudkacyjne' name="education">
                    <FaBookOpenReader size={40}/>
                </MainMenu.Item>
                <MainMenu.Item title='Korespondencja' name="messages">
                    <MdEmail size={40}/>
                </MainMenu.Item>
            </MainMenu>

            <section id={style.MainContent} className={style.GridElement}>
                {children}
            </section>

            <RightSidePanel>
                <RightSidePanel.UserDetails userName='USER_NAME' userRole='USER_ROLE' avatarSRC={Avatar} />
                <RightSidePanel.NotyficationsList>
                    {DUMMY_NOTYFICATIONS.map((notyfication,index) => (
                        <NotyficationsList.NotyficationElement key={index} title={notyfication.title} description={notyfication.description} />
                    ))}
                </RightSidePanel.NotyficationsList>
                <RightSidePanel.ActionButtons />
            </RightSidePanel>

        </div>
    )
}

export default Wrapper