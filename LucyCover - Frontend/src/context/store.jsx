import { combineReducers, configureStore } from "@reduxjs/toolkit";

import PatientSearchSlice from "./slices/PatientSearch_SLICE";
import OverlayModelSlice from "./slices/OverlayModel_SLICE";
import AddPatientForm from "./slices/AddPatientForm";
import AddFirstDocumentationForm from "./slices/AddFirstDocumentationForm";
import AddNextDocumentationForm from "./slices/AddNextDocumentationForm";
import AddPatientRecommendation from "./slices/AddPatientRecommendation";
import AddNewVisitToScheduleForm from "./slices/AddNewVisitToScheduleForm";
import MainMenuSlice from "./slices/MainMenuSlice";
import AddNewEducationMaterialSlice from "./slices/AddNewEducationMaterialSlice";
import AuthFormSlice from "./slices/AuthForm";


const reducers = combineReducers({
    patientSearch: PatientSearchSlice.reducer,
    overlayModel: OverlayModelSlice.reducer,
    addPatientForm: AddPatientForm.reducer,
    addFirstDocumentationForm: AddFirstDocumentationForm.reducer,
    addNextDocumentationForm: AddNextDocumentationForm.reducer,
    addPatientRecommendation: AddPatientRecommendation.reducer,
    addNewVisitToScheduleForm: AddNewVisitToScheduleForm.reducer,
    addMaterial: AddNewEducationMaterialSlice.reducer,
    mainMenu:MainMenuSlice.reducer,
    authForm: AuthFormSlice.reducer,
})

const store = configureStore({
    reducer: reducers
})

export default store;