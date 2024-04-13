import style from './css/PatientVisitsTable.module.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const PatientVisitElement = ({visit,editVisitPopupInvoke,deletePopupInvoke}) => {
    const {id,date,time,visitState} = visit;

    const [isExpanded,setIsExpanded] = useState(false)

    const DropdownMenuExpandTogglerHandler = () => {
        setIsExpanded((previousState) => {
            return !previousState
        })
    }

    let className;
    switch (visitState){
        case 'Odbyta':
            className = style.DoneVisit
        break;
        case 'Zaplanowana':
            className = style.PlanedVisit
        break;
        case 'Odwołana':
            className = style.CanceledVisit
        break;
    }

    return (
        <tr className={className}>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <span className={style.Badge}>{visitState}</span>
            </td>
            <td>
                <div className={style.EditButtonsCol}>
                    {
                        visitState === 'Odbyta' && 
                        (
                            <Link to='../documentation'>
                                <FaPlusCircle size={25} />
                            </Link>
                        )
                    }
                    <AnimatePresence>
                        {
                            isExpanded && (
                                <motion.div 
                                    className={style.ExpandMenu}
                                    variants={{
                                        hiden: {x:50,opacity:0},
                                        show: {x:0,opacity:1}
                                    }} 
                                    initial='hiden'
                                    animate='show'
                                    exit='hiden'>
                                        <FaRegEdit size={25} onClick={
                                                ()=> editVisitPopupInvoke(id)
                                            } />
                                        <FaRegTrashAlt size={25} onClick={
                                                ()=> deletePopupInvoke(date)
                                            } />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <IoMdMenu size={25} onClick={DropdownMenuExpandTogglerHandler} />
                </div>
            </td>
        </tr>
    )
}

export default PatientVisitElement