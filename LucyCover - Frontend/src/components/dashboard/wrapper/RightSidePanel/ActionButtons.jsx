//Style
import style from '../css/Wrapper.module.css'
//Hooks
import { useMutation } from '@tanstack/react-query';
import { Logout } from '@api/https';
import { useCookies } from 'react-cookie'

const ActionButtons = () => {
    const [cookies,setCookie,removeCookie] = useCookies(['authCookie']);

    const {mutate} = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            removeCookie("authCookie",{path:'/'})
        },
        onError: (ex) => {
            console.error(ex)
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