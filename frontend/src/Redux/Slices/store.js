import { configureStore } from "@reduxjs/toolkit";

// import authSlice from "./AuthSlice";
import authSlice from "./AuthSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        // quiz:QuizSlice
    },
    devTools:true
   
})

export default store