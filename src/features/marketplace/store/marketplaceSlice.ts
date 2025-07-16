import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { marketplaceApi } from '../services/marketplaceApi';
import { VA, Category } from '../types';

interface MarketplaceState {
  featuredVAs: VA[];
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketplaceState = {
  featuredVAs: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

export const fetchFeaturedVAs = createAsyncThunk(
  'marketplace/fetchFeaturedVAs',
  async () => {
    const response = await marketplaceApi.getFeaturedVAs();
    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  'marketplace/fetchCategories',
  async () => {
    const response = await marketplaceApi.getCategories();
    return response;
  }
);

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Featured VAs
    builder
      .addCase(fetchFeaturedVAs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedVAs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredVAs = action.payload;
      })
      .addCase(fetchFeaturedVAs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch featured VAs';
      });

    // Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { selectCategory, clearError } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;