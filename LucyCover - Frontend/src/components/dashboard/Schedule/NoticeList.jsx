import style from './css/Schedule.module.css'
import NoticeListElement from './NoticeListElement'
import DUMMY_NOTES from '../../../assets/DUMMY_DATA/DUMMY_NOTES.json';
import { Alert } from 'react-bootstrap';


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