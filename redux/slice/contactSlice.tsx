import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: {
      name: "",
      email: "",
      message: "",
    },
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export const { setContact } = contactSlice.actions;
const contactReducer = contactSlice.reducer;
export default contactReducer;
