import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    activePage: ""
}

const aviableOptions = ['schedule','patients','education','messages']

const MainMenuSlice = createSlice({
    name: 'MainMenu',
    initialState: defaultState,
    reducers: {
        SetActivePage: (state,action) => {
            const recivedOption = action.payload
            if(!aviableOptions.includes(recivedOption)){
                throw new Error("Recived option doesn't exist in aviableOptions array")
            }

            state.activePage = recivedOption
        }
    }
})

export const {SetActivePage,} = MainMenuSlice.actions
export default MainMenuSlice
