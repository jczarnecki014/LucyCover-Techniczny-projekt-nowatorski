import style from './css/Schedule.module.css'
import NoticeListElement from './NoticeListElement'

const NoticeList = () => {
    const notice = [
        {
          id: 1,
          status: "uwaga",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius, odio in pulvinar pretium, nisi quam rutrum massa, nec cursus eros elit ac purus"
        },
        {
          id: 2,
          status: "info",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius, odio in pulvinar pretium, nisi quam rutrum massa, nec cursus eros elit ac purus"
        },
        {
          id: 3,
          status: "info",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius, odio in pulvinar pretium, nisi quam rutrum massa, nec cursus eros elit ac purus"
        },
      ]

    return (
      <div className={style.NoticeSection}>
          <div className={style.ButtonSection}>
            <button>Dodaj notatkę</button>
          </div>
          <ul className={style.NoticeList}>
              {
                  notice.map(item => (
                      <NoticeListElement key={item.id} details={item} />
                  ))
              }

          </ul>
      </div>
    )
}

export default NoticeList