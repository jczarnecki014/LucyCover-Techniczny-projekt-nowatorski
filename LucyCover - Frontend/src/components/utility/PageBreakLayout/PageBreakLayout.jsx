//Components
import LayoutLeftSide from './LayoutLeftSide'
import LayoutRightSide from './LayoutRightSide'
//Style
import style from './css/PageBreakLayout.module.css'

/**
 * PageBreakLayout - page braker. This component divide page on left and right side. 
 * 
 * Child components:
 * 
 * [1] - LeftSide - (pink color)
 * 
 * [2] - RightSide 
 * 
 * @param {boolean} narrow - boolean which specify that left side should be narrow. Witch this option developer achive more space in   * right side
 */

const PageBreakLayout = ({children,narrow}) => {
    return (
        <div id={narrow && style.NarrowMode} className={style.Container}>
            {children}
        </div>
    )
}

PageBreakLayout.LeftSide = LayoutLeftSide;
PageBreakLayout.RightSide = LayoutRightSide;

export default PageBreakLayout;