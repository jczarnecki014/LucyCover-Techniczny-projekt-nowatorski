import { createSlice } from "@reduxjs/toolkit";

/**
 * OverlayModelSlice - Slice keep state of displaing overlay on application
 */

const OverlayModelSlice = createSlice({
    name: 'overlayModel',
    initialState: {
        isVisible: false,
    },
    reducers:{
        OverlayToggle: (state,action) => {
            state.isVisible = action.payload
        },
    }
})

export const {OverlayToggle} = OverlayModelSlice.actions

export default OverlayModelSlice