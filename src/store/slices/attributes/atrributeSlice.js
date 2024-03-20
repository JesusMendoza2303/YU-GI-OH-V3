import { createSlice } from '@reduxjs/toolkit'

export const attributeSlice = createSlice({
	name: 'attributes',
	initialState: {
		attributes: [],
		isLoading: false,
	},
	reducers: {
		startLoadingattributes: state => {
			state.isLoading = true
		},
		setattributes: (state, action) => {
			state.isLoading = false
			state.attributes = action.payload.attributes
		},
	},
})

// // esto es un action creator, osea aqui creo las acciones
export const { startLoadingattributes, setattributes } = attributeSlice.actions
