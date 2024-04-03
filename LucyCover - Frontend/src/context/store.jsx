import { combineReducers, configureStore } from "@reduxjs/toolkit";

import PatientSearchSlice from "./slices/PatientSearch_SLICE";
import OverlayModelSlice from "./slices/OverlayModel_SLICE";
import AddPatientForm from "./slices/AddPatientForm";
import AddFirstDocumentationForm from "./slices/AddFirstDocumentationForm";
import AddNextDocumentationForm from "./slices/AddNextDocumentationForm";


const reducers = combineReducers({
    patientSearch: PatientSearchSlice.reducer,
    overlayModel: OverlayModelSlice.reducer,
    addPatientForm: AddPatientForm.reducer,
    addFirstDocumentationForm: AddFirstDocumentationForm.reducer,
    addNextDocumentationForm: AddNextDocumentationForm.reducer
})

const store = configureStore({
    reducer: reducers
})

export default store;