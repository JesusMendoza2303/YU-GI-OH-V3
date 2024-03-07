/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../api/cardsApi'
import { setattributes, startLoadingattributes } from './atrributeSlice'

export const getAttributes = () => {
	return async (dispatch, getState) => {
		const attributes = await cardsApiLocal.get(`attributes`)
		dispatch(setattributes({ attributes: attributes.data }))
		console.log('🚀 ~ return ~ attributes:', attributes)
	}
}
export const createAttribute = newAttribute => {
	console.log('🚀 ~ createAttribute ~ newAttribute:', newAttribute)
	return async (dispatch, getState) => {
		const attributes = await cardsApiLocal.post(
			'http://localhost:3030/attributes',
			newAttribute,
		)
	}
}

export const removeAttribute = cardsid => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(
			`http://localhost:3030/data/${cardsid}`,
		)
	}
}
