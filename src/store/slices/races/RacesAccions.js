/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../../api/cardsApi'
import { setRaces, startLoadingRaces } from './raceSlice'

export const getRaces = () => {
	return async (dispatch, getState) => {
		const races = await cardsApiLocal.get(`races`)
		dispatch(setRaces({ races: races.data }))
	}
}
export const createRace = newRace => {
	return async (dispatch, getState) => {
		const racess = await cardsApiLocal.post(
			'http://localhost:3030/races',
			newRace,
		)
	}
}

export const removeRaces = raceId => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(
			`http://localhost:3030/races/${raceId}`,
		)
	}
}

export const editRaces = (idrow, race) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(
			`http://localhost:3030/races/${idrow}`,
			race,
		)
	}
}
