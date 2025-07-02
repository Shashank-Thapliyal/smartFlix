import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const searchSlice = createSlice(
    {
        name : "search",
        initialState : {
            showSearch : false
        },
        reducers : {
            toggleSearch : (state, action) =>{
                state.showSearch = !state.showSearch;
            }
        }
})

export const {toggleSearch} = searchSlice.actions

export default searchSlice.reducer;