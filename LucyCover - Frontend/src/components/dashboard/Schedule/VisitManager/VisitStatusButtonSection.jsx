import style from './css/AddNewVisit.module.css'

const VisitStatusButtonSection = ({visitStatus}) => {

    const GetVisitStatusActionButton = () => {
        switch(visitStatus) {
            case 'Odbyta':
                return (
                    <>
                        <button id={style.Rejected}>Odwołaj</button> 
                        <button id={style.Scheduled}>Zaplanowana</button>
                    </>
                )
    
            case 'Odwołana':
                return (
                    <>
                        <button id={style.Done}>Odbyta</button> 
                        <button id={style.Scheduled}>Zaplanowana</button>
                    </>
                )
    
            case 'Zaplanowana':
                return (
                    <>
                        <button id={style.Done}>Odbyta</button> 
                        <button id={style.Rejected}>Odwołaj</button>
                    </>
                )
        }
    }

    return (
        <>
            {
                GetVisitStatusActionButton()
            }
        </>
    )
}

export default VisitStatusButtonSection