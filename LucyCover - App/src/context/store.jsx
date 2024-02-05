import { combineReducers, configureStore } from "@reduxjs/toolkit";

import PatientSearchSlice from "./slices/PatientSearch_SLICE";
import OverlayModelSlice from "./slices/OverlayModel_SLICE";


const reducers = combineReducers({
    patientSearch: PatientSearchSlice.reducer,
    overlayModel: OverlayModelSlice.reducer,
})

const store = configureStore({
    reducer: reducers
})

export default store;