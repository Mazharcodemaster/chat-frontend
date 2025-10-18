

import { CreateUserInput } from "@/lib/type/userType"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const userRegister= createAsyncThunk(
    "user/register",
    async (data: CreateUserInput, thunkAPI) => {
        try {
            const res= await api
        } catch (error) {
            
        }
    }
)

// export const userLogin= createAsyncThunk(
//     "user/login",
//     async (data: any, thunkAPI) => {
//         const response = await fetch("http://localhost:3000/api/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//         const data = await response.json()
//         return data
//     }
// )

// export const userLogout= createAsyncThunk(
//     "user/logout",
//     async (data: , thunkAPI) => {
//         const response = await fetch("http://localhost:3000/api/user/logout", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//         const data = await response.json()
//         return data
//     }
// )


// export const userGetProfile= createAsyncThunk(
//     "user/getProfile",
//     async (data: any, thunkAPI) => {
//         const response = await fetch("http://localhost:3000/api/user/profile", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         })
//         const data = await response.json()
//         return data
//     }
// )


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(userLogout.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = null
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(userGetProfile.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(userGetProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(userGetProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export default userSlice.reducer
