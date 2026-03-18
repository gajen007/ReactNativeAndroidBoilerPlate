import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  value: boolean;
  uEmail: string | null;
  uName: string | null;
  authToken: string | null;
}

interface LoginPayload {
  uEmail: string;
  uName: string;
}

interface RootState {
  isLoggedIn: AuthState;
}

export const auth = createSlice({
  name: 'isLoggedIn',
initialState: {
    value: false,
    uEmail: null,
    uName: null,
    authToken: null,
} as AuthState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.value = true;
      state.uEmail = action.payload.uEmail;
      state.uName = action.payload.uName;
    },
    logout: (state) => {
      state.value = false;
      state.uEmail = null;
      state.uName = null;
      state.cartCount = 0;
      state.authToken = null;
    },
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
  },
});

export const selectLoginStatus = (state: RootState) => state.isLoggedIn?.value;
export const selectUserEmail = (state: RootState) => state.isLoggedIn?.uEmail;
export const selectUserName = (state: RootState) => state.isLoggedIn?.uName;
export const selectAuthToken = (state: RootState) => state.isLoggedIn?.authToken; // string | null

export const { login, logout, setCartCount, resetCart, setAuthToken } = auth.actions;

export default auth.reducer;