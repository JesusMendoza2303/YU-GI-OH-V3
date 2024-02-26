import { createSlice } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
	name: 'cards',
	initialState: {
		page: 0,
		cards: [],
		isLoading: false,
	},
	reducers: {
		startLoadingCards: state => {
			state.isLoading = true
		},
		setCards: (state, action) => {
			state.isLoading = false
			state.cards = action.payload.cards
			state.page = action.payload.page
		},
	},
})

// esto es un action creator, osea aqui creo las acciones
export const { startLoadingCards, setCards } = cardsSlice.actions

// export default cardsSlice.reducer
