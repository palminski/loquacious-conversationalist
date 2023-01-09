import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './slices/decksSlice';

export const store = configureStore({
    reducer: {
        decks: decksReducer,
    },
});