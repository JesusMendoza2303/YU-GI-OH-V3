/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../api/cardsApi'
import { setRaces, startLoadingRaces } from './raceSlice'

export const getRaces = () => {
	return async (dispatch, getState) => {
		const races = await cardsApiLocal.get(`races`)
		dispatch(setRaces({ races: races.data }))
		console.log('THUNK races:', races)
	}
}
export const createRace = newRace => {
	console.log('🚀 ~ createRace ~ newraces:', newRace)
	return async (dispatch, getState) => {
		const racess = await cardsApiLocal.post(
			'http://localhost:3030/races',
			newRace,
		)
	}
}

export const removeRaces = cardsid => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(
			`http://localhost:3030/data/${cardsid}`,
		)
	}
}
