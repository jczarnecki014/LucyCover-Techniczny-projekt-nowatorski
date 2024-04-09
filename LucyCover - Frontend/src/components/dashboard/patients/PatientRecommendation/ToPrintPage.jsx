import style from './css/PatientRecommendationDisplay.module.css'

import { forwardRef } from 'react'

import logoImg from '../../../../assets/images/logo_graphics/logo.png'

const ToPrintPage = forwardRef((props,ref) => {
    const {date,description} = props.data;
    return (
        <div ref={ref} className={style.RecommendationContent}>
            <div className={style.ContentHeader}>
                <div className={style.DoctorSignature}>
                    <img src={logoImg} />
                    <span>
                        <h4>LUCYNA CZARNECKA</h4>
                        <h6>POŁOŻNA ŚRODOWISKOWA</h6>
                        <h6>JELENIA GÓRA</h6>
                    </span>
                </div>
                <h6>{date}</h6>
            </div>
            <div className={style.ContentBody}>
                <h2>Zalecenia po wizycie z dnia {date}</h2>
                <div className={style.TextBox}>
                    {description}
                </div>
            </div>
        </div>
    )
})

export default ToPrintPage

