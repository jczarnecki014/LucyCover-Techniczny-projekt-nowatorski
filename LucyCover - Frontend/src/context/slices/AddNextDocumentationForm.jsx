import { createSlice } from "@reduxjs/toolkit";

const AddNextDocumentationForm = createSlice({
    name: 'AddNextDocumentationForm',
    initialState:{
        formInputs:{
            PatientFeedingCountPerDay: {value:'', isValid: false},
            PatientFeedingBreastNumber: {value:'', isValid: false},
            PatientFeedingHowMuchTime: {value:'', isValid: false},
            PatientFeedingInNight: {value:'Nie', isValid: true},
            PatientBreastFeedingWithHood: {value:'Nie', isValid: true},
            PatientBreastFeedingWithHood_HowLong: {value:'', isValid: false},
            PatientBreastFeedingAsNeeded: {value:'Nie', isValid: true},
            PatientBreastFeedingAsNeeded_How: {value:'', isValid: false},
                PatientFeedingCountPerDay_DAY1: {value:'', isValid: false},
                PatientFeedingCountPerDay_DAY2: {value:' ', isValid: false},
                PatientFeedingCountPerDay_DAY3: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY1: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY2: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY3: {value:'', isValid: false},
            PatientFeedingWay: {value:'', isValid: false},
            PatientExpressingBreastMilk: {value:'Nie', isValid: true},
            PatientExpressingBreastMilkHowManyYesterday: {value:'', isValid: false},
            PatientBreastGrowingDuringPregnacy: {value:'Nie', isValid: true},
            PatientBreastGrowingDuringPregnacy_DAY: {value:'', isValid: false},
            PatientMilkRush: {value:'Nie', isValid: true},
            PatientBreastSize: {value:'Mała', isValid: true},
            PatientBreastChanges: {value:'Nie', isValid: true},
            PatientBreastChanges_WHAT: {value:'', isValid: false},
            PatientBreastNipple: {value:['Prawidłowa'], isValid: true},
            PatientBreastNippleAfterFeeding: {value:'', isValid: false},
            PatientBreastNippleChanges: {value:'Nie', isValid: true},
            PatientBreastNippleChanges_WHAT: {value:'', isValid: false},
            PatientMentalState: {value:'', isValid: false},
            ResearchObservationBabyBehaviour: {value:'', isValid: false},
            BabyPeeingADay: {value:'', isValid: false},
            BabyExcretionADay: {value:'', isValid: false},
            BabyColic: {value:'Nie', isValid: true},
            BabyColicSinceWhen: {value:'', isValid: false},
            BabyNipple: {value:'Nie', isValid: true},
            BabyNippleSinceWhen: {value:'', isValid: false},
            PatientMedicationsUsed: {value:'', isValid: false},
            BabyMedicationsUsed: {value:'', isValid: false},
            PatientPeriodAfterDelivery: {value:'Nie', isValid: true},
            PatientPeriodAfterDelivery_WHEN: {value:'', isValid: false},
            PostureCorection: {value:'Nie', isValid: true},
            SuckTraining: {value:'Nie', isValid: true},
            BabyFatten: {value:'', isValid: false},
            OtherRecommendation: {value:'', isValid: false},

        }
    },
    reducers: {
        SetInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.formInputs = {
                ...state.formInputs,
                [inputId]:inputObject
            }
        },
    }
})

export const {SetInput} = AddNextDocumentationForm.actions
export default AddNextDocumentationForm
