import { createSlice } from "@reduxjs/toolkit";

const AddNextDocumentationForm = createSlice({
    name: 'AddNextDocumentationForm',
    initialState:{
        formInputs:{
            PatientFeedingCountPerDay: {value:'', isValid: false},
            PatientFeedingBreastNumber: {value:'', isValid: false},
            PatientFeedingInNight: {value:'', isValid: false},
            PatientFeedingHowMuchTime: {value:'', isValid: false},
            PatientFeedingInNight: {value:'', isValid: false},
            PatientBreastFeedingWithHood: {value:'', isValid: false},
            PatientBreastFeedingWithHood_HowLong: {value:'', isValid: false},
            PatientBreastFeedingAsNeeded: {value:'', isValid: false},
            PatientBreastFeedingAsNeeded_How: {value:'', isValid: false},
                PatientFeedingCountPerDay_DAY1: {value:'', isValid: false},
                PatientFeedingCountPerDay_DAY2: {value:' ', isValid: false},
                PatientFeedingCountPerDay_DAY3: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY1: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY2: {value:'', isValid: false},
                PatientFeedingMIXCountPerDay_DAY3: {value:'', isValid: false},
            PatientFeedingWay: {value:'', isValid: false},
            PatientExpressingBreastMilk: {value:'', isValid: false},
            PatientExpressingBreastMilkHowManyYesterday: {value:'', isValid: false},
            PatientBreastGrowingDuringPregnacy: {value:'', isValid: false},
            PatientBreastGrowingDuringPregnacy_DAY: {value:'', isValid: false},
            PatientMilkRush: {value:'', isValid: false},
            PatientBreastSize: {value:'', isValid: false},
            PatientBreastChanges: {value:'', isValid: false},
            PatientBreastChanges_WHAT: {value:'', isValid: false},
            PatientBreastNipple: {value:'', isValid: false},
            PatientBreastNippleAfterFeeding: {value:'', isValid: false},
            PatientBreastNippleChanges: {value:'', isValid: false},
            PatientBreastNippleChanges_WHAT: {value:'', isValid: false},
            PatientMentalState: {value:'', isValid: false},
            ResearchObservationBabyBehaviour: {value:'', isValid: false},
            BabyPeeingADay: {value:'', isValid: false},
            BabyExcretionADay: {value:'', isValid: false},
            BabyColic: {value:'', isValid: false},
            BabyColicSinceWhen: {value:'', isValid: false},
            BabyNipple: {value:'', isValid: false},
            BabyNippleSinceWhen: {value:'', isValid: false},
            PatientMedicationsUsed: {value:'', isValid: false},
            BabyMedicationsUsed: {value:'', isValid: false},
            PatientPeriodAfterDelivery: {value:'', isValid: false},
            PatientPeriodAfterDelivery_WHEN: {value:'', isValid: false},
            PostureCorection: {value:'', isValid: false},
            SuckTraining: {value:'', isValid: false},
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
