import style from '../css/PatientVisitsTable.module.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const PatientVisitElement = ({visit,editVisitPopupInvoke,deletePopupInvoke,isSchedulePage}) => {
    const {id,date,firstName,phoneNumber,lastName,clock,status,patientId} = visit;
    const [isExpanded,setIsExpanded] = useState(false)

    const DropdownMenuExpandTogglerHandler = () => {
        setIsExpanded((previousState) => {
            return !previousState
        })
    }

    let className;
    switch (status){
        case 'Odbyta':
            className = style.DoneVisit
        break;
        case 'Zaplanowana':
            className = style.PlanedVisit
        break;
        case 'Odwolana':
            className = style.CanceledVisit
        break;
    }

    const patientNameTd = <td className={style.test}>
        <span>{firstName} {lastName}</span>
        <br />
        <span>{phoneNumber}</span>
    </td>

    return (
        <motion.tr 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={className}
        >
            {
                isSchedulePage ? patientNameTd : <td>{date}</td>
            }
            <td>{clock}</td>
            <td>
                <span className={style.Badge}>{status}</span>
            </td>
            <td>
                <div className={style.EditButtonsCol}>
                    {
                        status === 'Odbyta' && 
                        (
                            <Link to={`/dashboard/patients/${patientId}/documentation`}>
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
                                                ()=> deletePopupInvoke({id,date,firstName,lastName})
                                            } />
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <IoMdMenu size={25} onClick={DropdownMenuExpandTogglerHandler} />
                </div>
            </td>
        </motion.tr>
    )
}

export default PatientVisitElement