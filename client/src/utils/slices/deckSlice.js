import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        
        cards: []
    }
};

export const deckSlice = createSlice({
    name: 'deck',
    initialState,

    reducers: {
        
        setDeck: (state, action) => {
            state.value = action.payload;
        },
        updateCards: (state, action) => {
            state.value.cards = (action.payload);
        },
        updateDeck: (state, action) => {
            state.value.title = action.payload.title;
            state.value.description = action.payload.description;
        }
    },
});

export const {setDeck, updateCards, updateDeck} = deckSlice.actions;
export const selectDeck = (state) => state.deck.value

export default deckSlice.reducer;