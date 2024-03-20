<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cardsSlice } from './slices/cards/cardsSlice'
import { raceSlice } from './slices/races/raceSlice'
import { attributeSlice } from './slices/attributes/atrributeSlice'
=======
import { configureStore } from '@reduxjs/toolkit'
import { cardsSlice } from './slices/cardsSlice'
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8

// import cardsSlice from './slices/cardsSlice'

// const reducers = combineReducers ({
// 	reducer: {races : raceSlice.reducer},

// })

export const store = configureStore({
<<<<<<< HEAD
	reducer: {
		cards: cardsSlice.reducer,
		races: raceSlice.reducer,
		attributes: attributeSlice.reducer,
	},
=======
	reducer: { cards: cardsSlice.reducer },
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8
})
