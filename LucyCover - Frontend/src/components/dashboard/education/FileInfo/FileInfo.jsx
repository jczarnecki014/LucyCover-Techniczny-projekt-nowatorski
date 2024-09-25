import { FaRegFilePdf } from "react-icons/fa6";
import style from '../css/Education.module.css'
import LabelInput from '../../../utility/LabelInput'
import { useMutation } from "@tanstack/react-query";
import { downloadEducationMaterial,DeleteEducationMaterial,queryClient } from "../../../../api/https";
import { useDispatch } from "react-redux";
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE";
import { LoadDefaultData } from "../../../../context/slices/AddNewEducationMaterialSlice";
import DownloadFileInBrowser from "../../../../assets/main/DownloadFileInBrowser";

const FileInfo = ({file,setOverlayMode,setErrorMessage}) => {
    const {id,fileName,fileTitle} = file;
    const dispatch = useDispatch();

    const downloadMutation = useMutation({
        mutationFn: downloadEducationMaterial,
        onSuccess: ({blob,fileName}) => {
            DownloadFileInBrowser(blob,fileName)
        },
        onError:(error)=>console.log(error)
    })

    const deleteMutation = useMutation({
        mutationFn: DeleteEducationMaterial,
        onSuccess: () => {
            setOverlayMode('success')
        },
        onError: (error) => {
            setOverlayMode('error')
            setErrorMessage(error.message)
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
            setOverlayMode("addMaterial");
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