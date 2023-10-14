import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfoList: {},
  },
  reducers: {
    changeCurrentUserFromRedux: (state, action) => {
      state.userInfoList = action.payload;
    },
  },
});

export const { changeCurrentUserFromRedux } = userSlice.actions;
export default userSlice.reducer;
