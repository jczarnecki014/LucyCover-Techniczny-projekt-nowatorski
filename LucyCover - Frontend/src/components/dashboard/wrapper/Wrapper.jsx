import style from './css/Wrapper.module.css'
import { useSelector } from 'react-redux';
import Avatar from '../../../assets/images/avatar.png'
import { DUMMY_NOTYFICATIONS } from '../../../assets/DUMMY_DATA/DUMMY_NOTYFICATIONS';

import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import MainMenu from './MainMenu/MainMenu';
import TopBar from './TopBar/TopBar'
import RightSidePanel from './RightSidePanel/RightSidePanel';
import ActionButtons from './RightSidePanel/ActionButtons';


const Wrapper = ({children}) => {
    const activeMenuOption = useSelector(state => state.mainMenu.activePage)
    console.log(activeMenuOption)
    return ( 
        <div className={style.GridContainer}>
            <TopBar />

            <MainMenu id={style.Menu} className={style.GridElement}>
                <MainMenu.Item title='Kalendarz wizyt'>
                    <IoCalendarNumberOutline size={40}/>
                </MainMenu.Item>
                <MainMenu.Item title='Pacjenci' activePage>
                    <FaUsers size={40}/>
                </MainMenu.Item>
                <MainMenu.Item title='Materiały eudkacyjne'>
                    <FaBookOpenReader size={40}/>
                </MainMenu.Item>
                <MainMenu.Item title='Korespondencja'>
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
                        <RightSidePanel.NotyficationElement key={index} title={notyfication.title} description={notyfication.description} />
                    ))}
                </RightSidePanel.NotyficationsList>
                <ActionButtons />
            </RightSidePanel>

        </div>
    )
}

export default Wrapper