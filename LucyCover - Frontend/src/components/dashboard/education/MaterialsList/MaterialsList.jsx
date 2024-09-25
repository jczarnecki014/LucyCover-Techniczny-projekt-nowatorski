import style from '../css/Education.module.css'
import MaterialElement from './MaterialElement'
import { useDispatch } from "react-redux";
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE";

const MaterialsList = ({materials,setActiveMaterial,activeElement,setNewMaterialCreatorMode}) => {
    const dispatch = useDispatch();

    const AddNewMaterialPopupInvoke = () => {
        dispatch(OverlayToggle(true))
        setNewMaterialCreatorMode();
    }

    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th>Data dodania:</th>
                    <th>Tytuł</th>
                    <th className={style.AddButtonCol}>
                        <button onClick={AddNewMaterialPopupInvoke}>Dodaj</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    materials.map(material => (
                        <MaterialElement 
                            key={material.id} 
                            active={activeElement.id == material.id} 
                            title={material.fileName} 
                            date={material.date} 
                            onClick={()=>setActiveMaterial(material)} />
                    ))
                }
            </tbody>
        </table>
    )
}

export default MaterialsList