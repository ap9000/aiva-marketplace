import { createSlice } from '@reduxjs/toolkit';

interface MessagingState {
  conversations: any[];
  activeConversation: string | null;
  messages: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagingState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  isLoading: false,
  error: null,
};

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
});

export const { setActiveConversation } = messagingSlice.actions;
export default messagingSlice.reducer;