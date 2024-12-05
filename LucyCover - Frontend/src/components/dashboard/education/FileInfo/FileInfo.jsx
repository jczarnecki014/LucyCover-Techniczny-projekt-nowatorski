//Components
import { FaRegFilePdf } from "react-icons/fa6";
import LabelInput from '@components/utility/LabelInput'
//Style
import style from '../css/Education.module.css'
//Hooks
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
//Store
import { OverlayToggle } from "@context/slices/OverlayModel_SLICE";
import { LoadDefaultData } from "@context/slices/AddNewEducationMaterialSlice";
//Assets
import DownloadFileInBrowser from "@assets/main/DownloadFileInBrowser";
//Api
import { DownloadEducationMaterial,DeleteEducationMaterial } from "@api/https";

/**
 * FileInfo - Component to displaying information about file as file name or fil title
 * 
 * Education <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Displaying information about file/material
 * 
 *  [2] - Contain buttons to edit existing file/material
 * 
 *  Params:
 * 
 *  @param {object} file - Object contain info about file
 * 
 *  @param {function} SetOverlayMode - Function to toggle overlay mode
 * 
 *  @param {function} SetErrorMessage - Function to set error overlay
 */

const FileInfo = ({file,SetOverlayMode,SetErrorMessage}) => {
    const {id,fileName,fileTitle} = file;
    const dispatch = useDispatch();

    const downloadMutation = useMutation({
        mutationFn: DownloadEducationMaterial,
        onSuccess: ({blob,fileName}) => {
            DownloadFileInBrowser(blob,fileName)
        },
        onError:(error)=>console.log(error)
    })

    const deleteMutation = useMutation({
        mutationFn: DeleteEducationMaterial,
        onSuccess: () => {
            SetOverlayMode('success')
        },
        onError: (error) => {
            SetOverlayMode('error')
            SetErrorMessage(error.message)
        },
        onSettled: () => {
            dispatch(OverlayToggle(true))
        }
    })

    const DownloadClickHandler = () => {
        downloadMutation.mutate({materialId:id})
    }

    const DeleteClickHandler = () => {
        deleteMutation.mutate({materialId:id})
    }

    const ChangeClickHandler = () => {
        try {
            dispatch(LoadDefaultData(file))
            dispatch(OverlayToggle(true))
            SetOverlayMode("addMaterial");
        }
        catch (error) {
            console.error(error)
            return;
        }
    }

    return (
        <div className={style.fileInfo}>
            <div className={style.fileIcon}>
                <FaRegFilePdf size={70} color="#828282" />
            </div>
            <div className={style.fileDetails}>
                <form>
                    <LabelInput label="Nazwa pliku" value={fileName ? fileName : "Prosze wybrać plik z listy"} readonly />
                    <LabelInput label="Tytuł" value={fileTitle ? fileTitle : "Prosze wybrać plik z listy" } readonly />
                </form>
            </div>
            <div className={style.fileActionButtons}>
                <button className={style.changeButton} onClick={ChangeClickHandler}>Zmień</button>
                <button className={style.downloadButton} onClick={DownloadClickHandler}>Pobierz</button>
                <button className={style.deleteButton} onClick={DeleteClickHandler}>Usuń</button>
            </div>
        </div>
    )
}

export default FileInfo