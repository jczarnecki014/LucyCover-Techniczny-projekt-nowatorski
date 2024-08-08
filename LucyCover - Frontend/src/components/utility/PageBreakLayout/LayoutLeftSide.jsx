import style from './css/PageBreakLayout.module.css'

const LayoutLeftSide = ({children,overflowY}) => {
    return (
        <div id={overflowY && style.Overflow_Y_scroll} className={style.LeftSide}>
            {children}
        </div>
    )
}

export default LayoutLeftSide;