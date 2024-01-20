import style from '../css/RightSideMenu.module.css'

import {Col} from 'react-bootstrap'


import UserDetails from './UserDetails'
import Notyfications from './Notyfications/Notyfications'
import ButtonSection from './ButtonSection'

const DUMY_NOTYFICATIONS = [
        {type: 'newMessage' },
        {type: 'systemInfo', description: 'Uwaga, w najbliższym czasie zaplanowano aktualizację systemu' },
        {type: 'warning' }
]

const DUMMY_USER = {
    userName: 'Lucyna Czarnecka',
    userRole: 'Położna środowiskowa'
}


const RightSideMenu = () => {
    return (
        <Col  md={4} lg={2} className={style.RightSideMenu}>
            <UserDetails userName={DUMMY_USER.userName} userRole={DUMMY_USER.userRole}/> 
            <Notyfications notyficationList={DUMY_NOTYFICATIONS} />
            <ButtonSection />
        </Col>
    )
}
export default RightSideMenu;