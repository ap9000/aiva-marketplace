import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchQuery: string;
  results: any[];
  filters: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchQuery: '',
  results: [],
  filters: {},
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setSearchQuery, setFilters } = searchSlice.actions;
export default searchSlice.reducer;