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
            state.value.cards = (action.payload.cards);
            
            console.log(action.payload);
        }
    },
});

export const {setDeck, updateCards} = deckSlice.actions;
export const selectDeck = (state) => state.deck.value

export default deckSlice.reducer;