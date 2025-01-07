//Style
import style from './css/PatientRecommendationDisplay.module.css'
//Hooks
import { forwardRef } from 'react'
//Assets
import logoImg from '@assets/images/logo_graphics/logo.png'
//Cookie
import {useCookies} from 'react-cookie'

/**
 * ToPrintPage - component to display ready to print patient documentation
 
 */

const ToPrintPage = forwardRef((props,ref) => {

    const [cookies] = useCookies(['authCookie']);

    return (
        <div ref={ref} className={style.RecommendationContent}>
            <div className={style.ContentHeader}>
                <div className={style.DoctorSignature}>
                    <img src={logoImg} />
                    <span>
                        <h4>{cookies.authCookie.userName}</h4>
                        <h6>{cookies.authCookie.userRole}</h6>
                    </span>
                </div>
                <h6>{props.date}</h6>
            </div>
            <div className={style.ContentBody}>
                <h2>Zalecenia po wizycie z dnia {props.date}</h2>
                <h3>{props.title}</h3>
                <div className={style.TextBox}>
                    {props.text}
                </div>
            </div>
        </div>
    )
})

export default ToPrintPage

