import style from './css/PageBreakLayout.module.css'

const LayoutRightSide = ({children}) => {
    return (
        <div className={style.RightSide}>
            {children}
        </div>
    )
}

export default LayoutRightSide;