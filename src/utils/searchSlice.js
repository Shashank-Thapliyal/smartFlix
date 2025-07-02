import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    showSearch: false,
  },
  reducers: {
    toggleSearch: (state) => {
      state.showSearch = !state.showSearch;
    },
  },
});

export const { toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;
