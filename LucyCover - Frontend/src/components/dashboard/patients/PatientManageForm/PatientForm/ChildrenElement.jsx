import { useState } from 'react';

import style from '../css/PatientAddingForm.module.css'

import {AnimatePresence, motion} from 'framer-motion'

import { PiBabyBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const ChildrenElement = ({childrenDetails,RemoveChildrenFromList,setChildrenFormMode,EditChildrenMode}) => {

    const [addChildrenIsHovered,setAddChildrenIsHovered] = useState(false)
    const [actionIconsAreHoverd, setActionIconsAreHoverd] = useState(false);
    
    const GetChildrenElement = () => {
        
        if(childrenDetails === undefined){
            return (
                <motion.span className={style.ChildrenElement} onHoverStart={()=>setAddChildrenIsHovered(true)} onHoverEnd={()=>setAddChildrenIsHovered(false)} onClick={()=>setChildrenFormMode('children')}> 

                    <motion.div animate={{opacity: addChildrenIsHovered ? 1:0.1, scale: addChildrenIsHovered ? 1 : 0.7, color: (addChildrenIsHovered ? '#692267' : "#000"), cursor:'pointer'}} transition={{duration:0.3}}
                    >
                        <FaPlus size={50}/>
                    </motion.div>

                    <motion.div animate={{opacity: addChildrenIsHovered ? 0.1:1, scale: addChildrenIsHovered ? 0.7 : 1}} transition={{duration:0.5}}>
                        <PiBabyBold size={50}/>
                    </motion.div>

                </motion.span>
            )
        }
        else {
            return(
                <motion.span 
                    className={`${style.ChildrenElement} ${style.Active}`} 
                    animate={{scale:[0.5,1,1.2,1]}} 
                    exit={{y:-30, opacity:0}} 
                    transition={{duration:0.3}} 
                    onHoverStart={()=>setActionIconsAreHoverd(true)} 
                    onHoverEnd={()=>setActionIconsAreHoverd(false)} 
                    >
                        <AnimatePresence>
                            {actionIconsAreHoverd &&
                                <motion.span 
                                    className={style.RemoveIcon} 
                                    initial={{scale:0.5}} 
                                    animate={{scale:1}} 
                                    exit={{scale:0}} 
                                    transition={{duration:0.3,type:'spring'}}
                                    >
                                        <RiDeleteBin2Fill 
                                            size={35} 
                                            onClick={()=>RemoveChildrenFromList(childrenDetails.index)}/>
                                        <MdEdit 
                                            size={35}
                                            onClick={()=>{EditChildrenMode(childrenDetails.index)}}/>
                                </motion.span>
                            }
                        </AnimatePresence>

                        <PiBabyBold size={50} />
                        <h6>{childrenDetails.childFirstName}</h6>
                        <small>{childrenDetails.childBirthDate}</small>
                </motion.span>
            )
        }
    }

    return (
        GetChildrenElement()
    )
}

export default ChildrenElement