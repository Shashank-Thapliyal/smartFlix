import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesSlice from "./moviesSlice"
const appStore = configureStore(
    {
        reducer : {
            user : userReducer,
            movies : moviesSlice,
        }
    }
)

export default appStore;