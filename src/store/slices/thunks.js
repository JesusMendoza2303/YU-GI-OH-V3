/* eslint-disable no-unused-vars */
import { cardsApi, cardsApiLocal } from '../../api/cardsApi'
import { setCards, startLoadingCards } from './cardsSlice'

import { redirect } from 'react-router-dom'

export const getcardsByType = (type, page = 0) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const { data } = await cardsApi.get(
			`?type=${type}&num=12&offset=${page * 10}`,
		)
		dispatch(setCards({ cards: data.data, page: page + 1 }))
	}
}

export const getcardsByName = (search, page = 0) => {
	return async (dispatch, getState) => {
		try {
			dispatch(startLoadingCards())
			const { data } = await cardsApi.get(
				`?fname=${search}&num=12&offset=${page * 10}`,
			)
			dispatch(setCards({ cards: data.data, page: page + 1 }))
		} catch (error) {
			const msgError = 'Carta no encontrada'
			dispatch(setCards({ msgError }))
		}
	}
}

// de aqui en adelante es experimento
export const getcardsLocal = () => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get('data')
		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsLocalByid = (cardsid, navigate) => {
	console.log('🚀 ~ getcardsLocalByid ~ cardsid:', cardsid)

	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?id=${cardsid}&_limit=1&_page=0`)
		dispatch(setCards({ cards: cards.data }))
		if (!cards.data.length) {
			navigate('/')
		}
	}
}

// export const getcardsLocalByid = (cardsid, navigate) => {
// 	console.log("🚀 ~ getcardsLocalByid ~ cardsid:", cardsid)
// 	console.log("🚀 ~ redirect:", redirect)

// 	return async (dispatch, getState) => {

// 			dispatch(startLoadingCards())
// 			const cards = await cardsApiLocal.get(`data?id=${cardsid}`)
// 			dispatch(setCards({ cards: cards.data }))
// 			if(!cards.data.length){
// 				navigate('/')
// 			}

// 		}
// 	}

// export const getcardsLocalByid = cardsid => {
// 	return async (dispatch, getState) => {
// 		dispatch(startLoadingCards())
// 		const cards = await cardsApiLocal.get(`data?id=${cardsid}`)
// 		dispatch(setCards({ cards: cards.data }))
// 	}
// }

// experimentacion 2
export const getcardsByTypeLOCAL = (type, page = 1) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(
			`data?_limit=12&_page=${page}&type=${type}`,
		)
		dispatch(setCards({ cards: cards.data, page: page + 1 }))
	}
}

export const getcardsByNameLocal2 = (search, page = 0) => {
	return async (dispatch, getState) => {
		try {
			dispatch(startLoadingCards())
			const cards = await cardsApiLocal.get(
				`data?name_like=${search}&_limit=12&_page=${page}`,
			)
			dispatch(setCards({ cards: cards.data, page: page + 1 }))
		} catch (error) {
			const msgError = 'Carta no encontrada'
			dispatch(setCards({ msgError }))
		}
	}
}
export const reinicio = () => {
	return async (dispatch, getState) => {
		const cards = []
		dispatch(setCards({ cards, page: 0, isLoading: false }))
	}
}
