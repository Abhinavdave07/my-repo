import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../Helper/axiosInstance.js";
import axios from "axios";


// initial state of auth slice
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')   || false,
    role:localStorage.getItem('role') || "",
    email:localStorage.getItem('email') || "",
    UserId:localStorage.getItem('UserId') || "",
    Name:localStorage.getItem('Name') || ""

}  


export const signout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/logout")
        console.log('res'+(await res).data);
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const createAccount=createAsyncThunk('/auth/signup',async(data, { rejectWithValue }) => {
    try{
        console.log('data in slice0,',data);
        const res=await axiosInstance.post("/register",data)
        
        console.log('res'+await res);
        return (await res).data
    }
    catch(e){
        // toast.error(e?.response?.data?.message)
         toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})


export const postDoubt=createAsyncThunk('/doubt',async(data)=>{
    try{
        console.log('in slice',data);
        const res=await axios.post("http://localhost:5000/doubts/",{
            title:data.title,
            description:data.description
        },{
            withCredentials:true,
            headers: {
              'Content-Type': 'application/json',  // Set content type if needed
              'Authorization': 'Bearer yourTokenHere'  // For authentication, if required
            }
          });
        console.log('res in fdfh',res);
        return res.data
        
    }
    catch(e){
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})

export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('data is ,',data);
        const res=await axiosInstance.post("/login",data)
        console.log('res from login',res);
        
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})



const authSlice=createSlice({
    name:'auth',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('in loginchekinnnn',action);
            // localStorage.setItem("data",action?.payload?.user)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("UserId",action?.payload?.existingUser?.id)
            localStorage.setItem("Name",action?.payload?.existingUser?.name)
            localStorage.setItem("email",action?.payload?.existingUser?.email)
            localStorage.setItem("role",action?.payload?.existingUser?.role)
            // localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            // state.id=action?.payload?.user?._id
            // console.log('inlocat storage',localStorage," ",localStorage.role);
            // state.role=localStorage.role
            state.isLoggedIn=localStorage.getItem("isLoggedIn")
            state.role=localStorage.getItem("role")
            state.Name=localStorage.getItem("name")
            state.email=localStorage.getItem("email")
            state.UserId=localStorage.getItem("UserId")

        })
        .addCase(signout.fulfilled,(state)=>{
            localStorage.clear();
            state.email={}
            state.isLoggedIn=false
            state.id=""
            state.role=""
            state.Name=""
        })

        // .addCase(getUserData.fulfilled,(state,action)=>{
        //     if(!action?.payload?.user) return
        //     localStorage.setItem("data",JSON.stringify(action?.payload?.user))
        //     localStorage.setItem("isLoggedIn",true)
        //     localStorage.setItem("role",action?.payload?.user?.role)
        //     state.isLoggedIn=true
        //     state.data=action?.payload?.user
        //     state.role=action?.payload?.user?.role
        // })

        // .addCase(createAccount.fulfilled,(state,action)=>{
        //     console.log('action in new',action);
        //     localStorage.setItem("email",action?.payload?.user?.email)
        //     localStorage.setItem("isLoggedIn",true)
        //     localStorage.setItem("name",action?.payload?.user?.Name)
        //     localStorage.setItem("role",action?.payload?.user?.role)
        //     localStorage.setItem("userId",action?.payload?.user?.userId)

        //     state.isLoggedIn=true
        //     state.data=action?.payload?.user
        //     state.id=action?.payload?.user?._id
        //     console.log('inlocat storage',localStorage," ",localStorage.role);
        //     state.role=localStorage.role
        // })
    }
})
export default authSlice.reducer