import { createSlice } from '@reduxjs/toolkit'

export const raceSlice = createSlice({
	name: 'races',
	initialState: {
		races: [],
		isLoading: false,
	},
	reducers: {
		startLoadingRaces: state => {
			state.isLoading = true
		},
		setRaces: (state, action) => {
			state.isLoading = false
			state.races = action.payload.races
		},
	},
})

// // esto es un action creator, osea aqui creo las acciones
export const { startLoadingRaces, setRaces } = raceSlice.actions
