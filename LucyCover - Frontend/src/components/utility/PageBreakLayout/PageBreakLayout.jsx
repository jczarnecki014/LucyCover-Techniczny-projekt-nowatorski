import style from './css/PageBreakLayout.module.css'
import LayoutLeftSide from './LayoutLeftSide'
import LayoutRightSide from './LayoutRightSide'

const PageBreakLayout = ({children}) => {
    return (
        <div className={style.Container}>
            {children}
        </div>
    )
}

PageBreakLayout.LeftSide = LayoutLeftSide;
PageBreakLayout.RightSide = LayoutRightSide;

export default PageBreakLayout;