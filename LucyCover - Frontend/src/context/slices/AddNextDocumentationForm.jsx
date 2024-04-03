import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    PatientFeedingCountPerDay: {value:'', isValid: false},
    PatientFeedingBreastNumber: {value:'', isValid: false},
    PatientFeedingHowMuchTime: {value:'', isValid: false},
    PatientFeedingInNight: {value:'Nie', isValid: true},
    PatientBreastFeedingWithHood: {value:'Nie', isValid: true},
    PatientBreastFeedingWithHood_HowLong: {value:'', isValid: true},
    PatientBreastFeedingAsNeeded: {value:'Nie', isValid: true},
    PatientBreastFeedingAsNeeded_How: {value:'', isValid: true},
        PatientFeedingCountPerDay_DAY1: {value:'', isValid: false},
        PatientFeedingCountPerDay_DAY2: {value:'', isValid: false},
        PatientFeedingCountPerDay_DAY3: {value:'', isValid: false},
        PatientFeedingMIXCountPerDay_DAY1: {value:'', isValid: false},
        PatientFeedingMIXCountPerDay_DAY2: {value:'', isValid: false},
        PatientFeedingMIXCountPerDay_DAY3: {value:'', isValid: false},
    PatientFeedingWay: {value:'', isValid: false},
    PatientExpressingBreastMilk: {value:'Nie', isValid: true},
    PatientExpressingBreastMilkHowManyYesterday: {value:'', isValid: true},
    PatientBreastGrowingDuringPregnacy: {value:'Nie', isValid: true},
    PatientBreastGrowingDuringPregnacy_DAY: {value:'', isValid: true},
    PatientMilkRush: {value:'Nie', isValid: true},
    PatientBreastSize: {value:'Mała', isValid: true},
    PatientBreastChanges: {value:'Nie', isValid: true},
    PatientBreastChanges_WHAT: {value:'', isValid: true},
    PatientBreastNipple: {value:['Prawidłowa'], isValid: true},
    PatientBreastNippleAfterFeeding: {value:'', isValid: false},
    PatientBreastNippleChanges: {value:'Nie', isValid: true},
    PatientBreastNippleChanges_WHAT: {value:'', isValid: true},
    PatientMentalState: {value:'', isValid: false},
    ResearchObservationBabyBehaviour: {value:'', isValid: false},
    BabyPeeingADay: {value:'', isValid: false},
    BabyExcretionADay: {value:'', isValid: false},
    BabyColic: {value:'Nie', isValid: true},
    BabyColicSinceWhen: {value:'', isValid: true},
    BabyNipple: {value:'Nie', isValid: true},
    BabyNippleSinceWhen: {value:'', isValid: true},
    PatientMedicationsUsed: {value:'', isValid: true},
    BabyMedicationsUsed: {value:'', isValid: true},
    PatientPeriodAfterDelivery: {value:'Nie', isValid: true},
    PatientPeriodAfterDelivery_WHEN: {value:'', isValid: true},
    PostureCorection: {value:'Nie', isValid: true},
    SuckTraining: {value:'Nie', isValid: true},
    BabyFatten: {value:'', isValid: true},
    OtherRecommendation: {value:'', isValid: true},
}

const AddNextDocumentationForm = createSlice({
    name: 'AddNextDocumentationForm',
    initialState:{
        formInputs: defaultState
    },
    reducers: {
        SetInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.formInputs = {
                ...state.formInputs,
                [inputId]:inputObject
            }
        },
        SetFormDefault: (state,action) => {
            state.formInputs = defaultState
        }
    }
})

export const {SetInput,SetFormDefault} = AddNextDocumentationForm.actions
export default AddNextDocumentationForm
