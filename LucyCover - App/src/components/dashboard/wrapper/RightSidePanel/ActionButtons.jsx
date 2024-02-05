import style from '../css/Wrapper.module.css'

const ActionButtons = ({userName,userRole,avatarSRC}) => {
    return ( 
        <div className={style.ActionButtons}>
            <button id={style.ManageButton}>ZARZĄDZAJ</button>
            <button id={style.LogoutButton}>WYLOGUJ</button>
        </div>
    )
}

export default ActionButtons