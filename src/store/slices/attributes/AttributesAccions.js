/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../../api/cardsApi'
import { setattributes, startLoadingattributes } from './atrributeSlice'

export const getAttributes = () => {
	return async (dispatch, getState) => {
		const attributes = await cardsApiLocal.get(`attributes`)
		dispatch(setattributes({ attributes: attributes.data }))
	}
}
export const createAttribute = newAttribute => {
	return async (dispatch, getState) => {
		const attributes = await cardsApiLocal.post(
			'http://localhost:3030/attributes',
			newAttribute,
		)
	}
}

export const removeAttribute = attributeId => {
	return async (dispatch, getState) => {
		const attributes = await cardsApiLocal.delete(
			`http://localhost:3030/attributes/${attributeId}`,
		)
	}
}

export const editAttribute = (idrow, attribute) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(
			`http://localhost:3030/attributes/${idrow}`,
			attribute,
		)
	}
}
