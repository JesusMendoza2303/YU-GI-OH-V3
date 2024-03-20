import { createSlice } from '@reduxjs/toolkit'

export const cardsSlice = createSlice({
	name: 'cards',
	initialState: {
		page: 0,
		cards: [],
		isLoading: false,
		count: 0,
		tarjeta: [],
	},
	reducers: {
		startLoadingCards: state => {
			state.isLoading = true
		},
		setCards: (state, action) => {
			state.isLoading = false
			state.cards = action.payload.cards
			state.page = action.payload.page
<<<<<<< HEAD:src/store/slices/cards/cardsSlice.js
			state.tarjeta = action.payload.tarjeta
			state.count = action.payload.count
=======
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/cardsSlice.js
		},
	},
})

// esto es un action creator, osea aqui creo las acciones
export const { startLoadingCards, setCards } = cardsSlice.actions

// export default cardsSlice.reducer
