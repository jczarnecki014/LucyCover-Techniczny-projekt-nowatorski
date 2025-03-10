//Components
import LabelInput from "@components/utility/LabelInput"
import OverlayModel from "@components/utility/OverlayModel"
import  {motion}  from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
//Style
import style from "../css/Education.module.css"
//hooks
import { useDispatch,useSelector } from "react-redux";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
//store
import { SetInput,SetFormDefault } from "@context/slices/AddNewEducationMaterialSlice";
//assets
import CheckFormIsValid from '@assets/validation/CheckFormIsValid'
import { AcceptedFileUploadFormat } from "@assets/validation/AcceptedFileUploadFormat";
//api
import { AddNewMaterial,queryClient } from "@api/https";
import useInputsSilce from "@hooks/useInputsSlice";

/**
 * AddMaterial - Component to adding material.
 * 
 * Education <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Displaying and validating form to sending new file
 * 
 *  [2] - Posting new material on server
 * 
 *  Params:
 * 
 *  @param {function} SetOverlayMode - This function define mode of overlay display
 * 
 *  @param {function} SetErrorMessage - Function to set error message as state which update error overlay
 * 
 */

const AddMaterial = ({SetOverlayMode,SetErrorMessage}) => {
    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const formInputs = useSelector(state => state.addMaterial.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)
    const fileIsUploaded = formInputs.file.isValid;
    const InputChangeHandler = useCallback(useInputsSilce(SetInput),[SetInput])

    const {mutate} = useMutation({
        mutationFn: AddNewMaterial,
        onError: (error) => {
            SetOverlayMode("error")
            SetErrorMessage(error.message)
            dispatch(SetFormDefault())
        },
        onSuccess: () => {
            SetOverlayMode("success")
            queryClient.invalidateQueries(['educationMaterials'])
            dispatch(SetFormDefault())
        }
    })

    const HandleFileUploadClick = () => {
        fileInputRef.current.click(); // Kliknięcie na ukryty input
    };

    const HandleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            InputChangeHandler({ inputId: "file", inputObject: {value: file.name, isValid: true} });
        }
    };

    const HandleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('id',formInputs.id.value)
        if(formIsValid){
            mutate({formData})
        }    
    }

    return (
        <OverlayModel title="Dodaj plik" smallSize>
            <div className={style.addMaterialContainer}>
                <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    transition={{ type: "spring", stiffness: 300 }} 
                    className={`${style.fileUploadBox} ${fileIsUploaded && style.fileUploaded}`}
                    onClick={HandleFileUploadClick}
                >
                    <FaCloudUploadAlt size={100} />
                    {
                        fileIsUploaded && <h6>Plik załadowany</h6>
                    }
                </motion.div>
                <form className={style.inputsSection} onSubmit={HandleSubmit}>
                    <LabelInput controlId="title" label="Tytuł" onInput={InputChangeHandler} value={formInputs.title.value} required />
                    <LabelInput 
                        controlId="fileName" 
                        label="Plik"  
                        onInput={InputChangeHandler} 
                        value={formInputs.fileName.value} 
                        required 
                    />
                    <input 
                        type="file" 
                        name="file"
                        style={{display:'none'}} 
                        ref={fileInputRef} 
                        accept={AcceptedFileUploadFormat} 
                        onChange={HandleFileChange} />
                    {
                        formIsValid && (
                            <div className={style.buttonSection}>
                                <button>Dodaj</button>
                            </div>
                        )
                    }
                </form>
            </div>
        </OverlayModel>
    )
}

export default AddMaterial