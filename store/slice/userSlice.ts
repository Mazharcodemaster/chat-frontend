

import { api } from "@/lib/api/config"
import { CreateUserInput, LoginUserInput } from "@/lib/type/userType"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiError } from "next/dist/server/api-utils"
import { RootState } from "../storeTypes"

export const userRegister = createAsyncThunk<any, CreateUserInput, { rejectValue: ApiError }>(
    "user/register",
    async (data: CreateUserInput, thunkAPI) => {
        try {
            const res = await api.post("/user/register", data)
            return res.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }

)

export const userLogin = createAsyncThunk<any, LoginUserInput, { rejectValue: ApiError }>(
    "user/login",
    async (data: LoginUserInput, thunkAPI) => {
        try {

            const res = await api.post("/user/login", data)
            return res.data
        } catch (error: any) {
            console.log('error in thank', error);
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const userLogout = createAsyncThunk<any, any, { rejectValue: ApiError }>(
    "user/logout",
    async (data: any, thunkAPI) => {
        try {
            const res = await api.post("/user/logout", data)
            return res.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


export const userGetProfile = createAsyncThunk<any, any, { rejectValue: ApiError }>(
    "user/getProfile",
    async (data: { userId: string }, thunkAPI) => {
        try {
            const res = await api.get("/user/profile")
            return res.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

interface UserState {
    user: any | null
    accessToken: string | null
    isLoading: boolean
    error: ApiError | null | undefined
}

const initialState: UserState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
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
                state.user = action.payload.user;
                 state.accessToken = action.payload.accessToken;
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
                state.user = action.payload.user; // backend sends { user, accessToken } 
                state.accessToken = action.payload.accessToken;
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
                state.user = null;
                 state.accessToken = null;
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
                state.user = action.payload.user; 
                state.accessToken = action.payload.accessToken;
            })
            .addCase(userGetProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export default userSlice.reducer
export const { setUser, setIsLoading, setError,setAccessToken } = userSlice.actions

export const selectUser = (state: RootState) => state.userData.user
export const selectAccessToken = (state: RootState) => state.userData.accessToken;
export const selectIsLoading = (state: RootState) => state.userData.isLoading
export const selectError = (state: RootState) => state.userData.error