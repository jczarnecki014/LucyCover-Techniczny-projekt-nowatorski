import LabelInput from "../../../utility/LabelInput"
import OverlayModel from "../../../utility/OverlayModel"
import style from "../css/Education.module.css"
import { FaCloudUploadAlt } from "react-icons/fa";
import  {motion}  from "framer-motion";
import { useDispatch,useSelector } from "react-redux";
import { SetInput,SetFormDefault } from "../../../../context/slices/AddNewEducationMaterialSlice";
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'
import { useRef } from "react";
import { AcceptedFileUploadFormat } from "../../../../assets/Validation/AcceptedFileUploadFormat";
import { useMutation } from "@tanstack/react-query";
import { AddNewMaterial,queryClient } from "../../../../api/https";

const AddMaterial = ({title,setOverlayMode,setErrorMessage}) => {
    const {mutate} = useMutation({
        mutationFn: AddNewMaterial,
        onError: (error) => {
            console.log(error.message)
            setOverlayMode("error")
            setErrorMessage(error.message)
            dispatch(SetFormDefault())
        },
        onSuccess: () => {
            setOverlayMode("success")
            queryClient.invalidateQueries(['educationMaterials'])
            dispatch(SetFormDefault())
        }
    })

    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const formInputs = useSelector(state => state.addMaterial.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)
    const fileIsUploaded = formInputs.file.isValid;

    const handleFileUploadClick = () => {
        fileInputRef.current.click(); // Kliknięcie na ukryty input
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            InputChangeHandler({ inputId: "file", inputObject: {value: file.name, isValid: true} });
        }
    };

    const InputChangeHandler = (object) => {
        dispatch(SetInput(object))
    }

    const HandleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append('id',formInputs.id.value)
        if(formIsValid){
            mutate({formData})
        }    
    }

    return (
        <OverlayModel title={title} smallSize>
            <div className={style.addMaterialContainer}>
                <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    transition={{ type: "spring", stiffness: 300 }} 
                    className={`${style.fileUploadBox} ${fileIsUploaded && style.fileUploaded}`}
                    onClick={handleFileUploadClick}
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
                        onChange={handleFileChange} />
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