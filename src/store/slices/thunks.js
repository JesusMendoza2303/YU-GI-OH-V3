/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../api/cardsApi'
import { setCards, startLoadingCards } from './cardsSlice'

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
		const cards = await cardsApiLocal.get(`data?id=${cardsid}`)
		dispatch(setCards({ cards: cards.data }))
		if (!cards.data.length) {
			navigate('/')
		}
	}
}

export const getcardsByTypeLOCAL = (type, page = 1) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(
			`data?_limit=12&_page=${page}&type=${type}`,
		)
		dispatch(setCards({ cards: cards.data, page: page + 1 }))
	}
}

export const getcardsByNameLocal2 = (search) => {
	return async (dispatch, getState) => {
		try {
			dispatch(startLoadingCards())
			const cards = await cardsApiLocal.get(
				`data?name_like=${search}`,
			)
			dispatch(setCards({ cards: cards.data }))
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

export const remove = (cardsid) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(`http://localhost:3030/data/${cardsid}`)
		
	}
}

export const editCard = (cardsid, naipe) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(`http://localhost:3030/data/${cardsid}`, naipe)
		
	}
}

export const createCard = (naipe) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.post('http://localhost:3030/data', naipe)
		
	}
}

