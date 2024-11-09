//Style
import style from '../css/Wrapper.module.css'
//Hooks
import { useCookies } from 'react-cookie'

const UserDetails = ({avatarSRC}) => {
    const [cookies] = useCookies(['authCookie']);

    return ( 
            <div className={style.UserDetails}>
                <img src={avatarSRC} />
                <h5>{cookies.authCookie.userName}</h5>
                <h6>{cookies.authCookie.userRole}</h6>
            </div>
    )
}

export default UserDetails