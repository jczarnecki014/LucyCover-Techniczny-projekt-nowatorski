//Components
import MaterialElement from './MaterialElement'
//Style
import style from '../css/Education.module.css'
//Hooks
import { useDispatch } from "react-redux";
//Store
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE";

/**
 * MaterialsList - Component to displaying list of stored materials by user
 * 
 * Education <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Displaying list of materials
 * 
 *  [2] - Button to add new material/file
 * 
 *  Params:
 * 
 *  @param {Array} materials - array of materials object. Items witch will be displayed in list
 * 
 *  @param {function} SetActiveMaterial - Function to set selected material as active. (Currently selected)
 * 
 *  @param {function} SetNewMaterialCreatorMode - Function to open form to sending file
 */

const MaterialsList = ({materials,SetActiveMaterial,activeElement,SetNewMaterialCreatorMode}) => {
    const dispatch = useDispatch();

    const AddNewMaterialPopupInvoke = () => {
        dispatch(OverlayToggle(true))
        SetNewMaterialCreatorMode();
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
                            onClick={()=>SetActiveMaterial(material)} />
                    ))
                }
            </tbody>
        </table>
    )
}

export default MaterialsList