import { combineReducers, configureStore } from "@reduxjs/toolkit";

import PatientSearchSlice from "./slices/PatientSearch_SLICE";
import OverlayModelSlice from "./slices/OverlayModel_SLICE";
import AddPatientForm from "./slices/AddPatientForm";


const reducers = combineReducers({
    patientSearch: PatientSearchSlice.reducer,
    overlayModel: OverlayModelSlice.reducer,
    addPatientForm: AddPatientForm.reducer,
})

const store = configureStore({
    reducer: reducers
})

export default store;