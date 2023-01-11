import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        title:"testRedux-initial",
        description:'Test',
        cards: []
    }
};

export const deckSlice = createSlice({
    name: 'deck',
    initialState,

    reducers: {
        
        setDeck: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const {setDeck} = deckSlice.actions;
export const selectDeck = (state) => state.deck.value

export default deckSlice.reducer;