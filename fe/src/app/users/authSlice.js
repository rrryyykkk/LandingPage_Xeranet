import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, logoutUser } from "../service/api";

// thunks
export const login = createAsyncThunk(
  "/auth/login",
  async (credentials, thunkAPI) => {
    try {
      await loginUser(credentials.email, credentials.password);
      const user = await fetchUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMe = createAsyncThunk("/auth/me", async (_, thunkAPI) => {
  try {
    const user = await fetchUser();
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    const user = await logoutUser();
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // getMe
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
