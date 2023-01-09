import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [{
        title:"testRedux-initial",
        cards: [1,2,3]
    }]
};

export const decksSlice = createSlice({
    name: 'decks',
    initialState,

    reducers: {
        
        addTestDeck: (state, action) => {
            state.value = action.payload;
            state.value.push({
                title:"testRedux",
                cards: []
            })
        }
    },
});

export const {addTestDeck} = decksSlice.actions;
export const selectDecks = (state) => state.decks.value

export default decksSlice.reducer;