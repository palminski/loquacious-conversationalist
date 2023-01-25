import { configureStore } from '@reduxjs/toolkit';
import deckReducer from './slices/deckSlice';


export const store = configureStore({
    reducer: {
        deck: deckReducer,

    },
});