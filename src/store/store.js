/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cardsSlice } from './slices/cardsSlice'
import { raceSlice } from './slices/raceSlice'
import { attributeSlice } from './slices/atrributeSlice'

// import cardsSlice from './slices/cardsSlice'

// const reducers = combineReducers ({
// 	reducer: {races : raceSlice.reducer},

// })

export const store = configureStore({
	reducer: {
		cards: cardsSlice.reducer,
		races: raceSlice.reducer,
		attributes: attributeSlice.reducer,
	},
})
