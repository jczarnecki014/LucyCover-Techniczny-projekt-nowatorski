import style from '../css/Wrapper.module.css'

const UserDetails = ({userName,userRole,avatarSRC}) => {
    return ( 
            <div className={style.UserDetails}>
                <img src={avatarSRC} />
                <h5>{userName}</h5>
                <h6>{userRole}</h6>
            </div>
    )
}

export default UserDetails