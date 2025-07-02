import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesSlice from "./moviesSlice"
import searchSlice from "./searchSlice"
import languageSlice from "./languageSlice"
const appStore = configureStore(
    {
        reducer : {
            user : userReducer,
            movies : moviesSlice,
            search : searchSlice,
            language : languageSlice
        }
    }
)

export default appStore;