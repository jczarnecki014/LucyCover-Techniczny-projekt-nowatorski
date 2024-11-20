//Components 
import NoticeListElement from './NoticeListElement'
//Style
import style from './css/Schedule.module.css'
//Dumydata
import DUMMY_NOTES from '../../../assets/DUMMY_DATA/DUMMY_NOTES.json';

/** 
* NoticeList - component to controll user notice (anavaiable yet)
*
* 
* Functionality:
*
* [1] - Displaying user notice list
*
* [2] - Making new notes
*
*/

const NoticeList = () => {
    const info = "Przepraszamy, ta funkcja nie jest jeszcze dostępna"

    return (
      <div className={style.NoticeSection}>
        <div className={style.ButtonSection}>
          <button title={info} disabled onClick={()=>alert(info)}>Dodaj notatkę</button>
        </div>
        <ul className={style.NoticeList}>
            {
                DUMMY_NOTES.notice.map(item => (
                    <NoticeListElement key={item.id} details={item} />
                ))
            }

        </ul>
      </div>
  )
}

export default NoticeList