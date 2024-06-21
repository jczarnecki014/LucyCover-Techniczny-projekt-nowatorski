import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    patientFeedingCountPerDay: {value:'', isValid: false},
    patientFeedingBreastNumber: {value:'', isValid: false},
    patientFeedingHowMuchTime: {value:'', isValid: false},
    patientFeedingInNight: {value:'Nie', isValid: true},
    patientBreastFeedingWithHood: {value:'Nie', isValid: true},
    patientBreastFeedingWithHood_HowLong: {value:'', isValid: true},
    patientBreastFeedingAsNeeded: {value:'Nie', isValid: true},
    patientBreastFeedingAsNeeded_How: {value:'', isValid: true},
        patientFeedingCountPerDay_DAY1: {value:'', isValid: false},
        patientFeedingCountPerDay_DAY2: {value:'', isValid: false},
        patientFeedingCountPerDay_DAY3: {value:'', isValid: false},
        patientFeedingMIXCountPerDay_DAY1: {value:'', isValid: false},
        patientFeedingMIXCountPerDay_DAY2: {value:'', isValid: false},
    patientFeedingMIXCountPerDay_DAY3: {value:'', isValid: false},
    patientFeedingWay: {value:'', isValid: false},
    patientExpressingBreastMilk: {value:'Nie', isValid: true},
    patientExpressingBreastMilkHowManyYesterday: {value:'', isValid: true},
    patientBreastGrowingDuringPregnacy: {value:'Nie', isValid: true},
    patientBreastGrowingDuringPregnacy_DAY: {value:'', isValid: true},
    patientMilkRush: {value:'Nie', isValid: true},
    patientBreastSize: {value:'Mała', isValid: true},
    patientBreastChanges: {value:'Nie', isValid: true},
    patientBreastChanges_WHAT: {value:'', isValid: true},
    patientBreastNipple: {value:'', isValid: false},
    patientBreastNippleAfterFeeding: {value:'', isValid: false},
    patientBreastNippleChanges: {value:'Nie', isValid: true},
    patientBreastNippleChanges_WHAT: {value:'', isValid: true},
    patientMentalState: {value:'', isValid: false},
    researchObservationBabyBehaviour: {value:'', isValid: false},
    babyPeeingADay: {value:'', isValid: false},
    babyExcretionADay: {value:'', isValid: false},
    babyColic: {value:'Nie', isValid: true},
    babyColicSinceWhen: {value:'', isValid: true},
    babyNipple: {value:'Nie', isValid: true},
    babyNippleSinceWhen: {value:'', isValid: true},
    patientMedicationsUsed: {value:'', isValid: true},
    babyMedicationsUsed: {value:'', isValid: true},
    patientPeriodAfterDelivery: {value:'Nie', isValid: true},
    patientPeriodAfterDelivery_WHEN: {value:'', isValid: true},
    PostureCorection: {value:'Nie', isValid: true},
    SuckTraining: {value:'Nie', isValid: true},
    babyFatten: {value:'', isValid: true},
    otherRecommendation: {value:'', isValid: true},
    patientChildId: {value:'',isValid:false},
    visitDate: {value:'',isValid:false},
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
        LoadDefaultData: (state,action) => {
            const recivedData = action.payload
            let newState = defaultState;
            for(let propName in recivedData){
                newState = {
                    ...newState,
                    [propName]: {
                        value: recivedData[propName],
                        isValid: true //after asigned to inputs onChange function automaticaly check validation of recived inputs //
                    }
                }
            }
            state.formInputs = newState;
        },
        SetFormDefault: (state,action) => {
            state.formInputs = defaultState
        }
    }
})

export const {SetInput,SetFormDefault,LoadDefaultData} = AddNextDocumentationForm.actions
export default AddNextDocumentationForm
