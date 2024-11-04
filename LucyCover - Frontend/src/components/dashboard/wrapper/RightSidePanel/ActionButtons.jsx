import { useMutation } from '@tanstack/react-query';
import { Logout } from '../../../../api/https';
import style from '../css/Wrapper.module.css'
import { useCookies } from 'react-cookie'

const ActionButtons = ({userName,userRole,avatarSRC}) => {
    const [cookies,setCookie,removeCookie] = useCookies(['authCookie']);

    const {mutate} = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            console.log("success")
            removeCookie("authCookie",{path:'/'})
        },
        onError: (ex) => {
            console.log(ex)
        }
    })

    const OnLogoutClick = () => {
        mutate()
    }

    return ( 
        <div className={style.ActionButtons}>
            <button id={style.ManageButton}>ZARZĄDZAJ</button>
            <button id={style.LogoutButton} onClick={OnLogoutClick}>WYLOGUJ</button>
        </div>
    )
}

export default ActionButtons