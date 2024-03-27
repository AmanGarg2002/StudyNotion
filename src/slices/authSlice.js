import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,
  signupData: null,
  protectRoute: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },

    setProtectRoute(state, value) {
      state.protectRoute = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData, setProtectRoute } =
  authSlice.actions;
export default authSlice.reducer;
