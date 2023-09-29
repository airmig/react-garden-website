import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  selectedId: null,
  error: "",
  data: [],
  isLoading: false,
  selectedCollectionItem: {},
  selectedItemId: null,
  loginToken: {},
};

const plantSlice = createSlice({
  name: "plant",
  initialState: initialState,
  reducers: {
    searchTerm(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, searchTerm: action.payload };
    },
    selectedPlant(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, selectedId: action.payload };
    },
    setData(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, data: action.payload };
    },
    setError(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, error: action.payload };
    },
    setIsLoading(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, isLoading: action.payload };
    },
    setSelectedCollectionItem(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, selectedCollectionItem: action.payload };
    },
    setLoginToken(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, loginToken: action.payload };
    },
    setSelectedItemId(state, action) {
      // console.log("in dispatcher", action);
      return { ...state, selectedItemId: action.payload };
    },
  },
});

export const {
  searchTerm,
  selectedPlant,
  setData,
  setError,
  setIsLoading,
  setSelectedCollectionItem,
  setLoginToken,
  setSelectedItemId,
} = plantSlice.actions;

export default plantSlice.reducer;
