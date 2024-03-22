/* eslint-disable no-unused-vars */
import { cardsApiLocal } from '../../../api/cardsApi'
import { setCards, startLoadingCards } from './cardsSlice'

export const getcardsLocal = (page = 1) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?_limit=18&_page=${page}`)
		dispatch(setCards({ cards: cards.data, page }))
	}
}

export const getScrollingCardsLocal = (page = 1, prevCards = []) => {
	const prevCardsArray = [...prevCards]
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.get(`data?_limit=18&_page=${page}`)
		const arrayCards = prevCardsArray.concat(cards.data)
		dispatch(setCards({ cards: arrayCards, page }))
	}
}

export const getcardsGrid = (page = 1) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data`)
		dispatch(setCards({ cards: cards.data, page }))
	}
}

export const getcardsLocalByid = (cardsid, navigate) => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?id=${cardsid}`)
		dispatch(setCards({ cards: cards.data }))
		if (!cards.data.length) {
			navigate('/error')
		}
	}
}

export const getcardsByRaceDetail = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?race=${value.name}`)

		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByAttributeDetail = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?attribute=${value.name}`)

		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByTypeLOCAL = (type, pagination, tarjeta, count) => {
	return async (dispatch, getState, resolve, reject) => {
		dispatch(startLoadingCards())
		const tarjeta = await cardsApiLocal.get(`data?type=${type}`)

		const cards = tarjeta.data.slice(pagination.from, pagination.to)
		const count = tarjeta.data.length

		dispatch(setCards({ tarjeta: tarjeta.data, cards, count }))
	}
}

export const getcardsByNameLocal2 = (search, pagination, tarjeta, count) => {
	return async (dispatch, getState) => {
		try {
			dispatch(startLoadingCards())
			const tarjeta = await cardsApiLocal.get(
				`data?name_like=${search}`,
				// `data?_limit=18&_page=${page}?name_like=${search}`,
			)
			const cards = tarjeta.data.slice(pagination.from, pagination.to)
			const count = tarjeta.data.length
			dispatch(setCards({ tarjeta: tarjeta.data, cards, count }))
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

export const remove = cardsid => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(
			`http://localhost:3030/data/${cardsid}`,
		)
	}
}

export const editCard = (cardsid, naipe) => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(
			`http://localhost:3030/data/${cardsid}`,
			naipe,
		)
	}
}

export const editCardGrid = (idrow, naipe) => {
	console.log('🚀 ~ editCardGrid ~ params:', idrow)
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(
			`http://localhost:3030/data/${idrow}`,
			naipe,
		)
	}
}

export const createCard = naipe => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.post('http://localhost:3030/data', naipe)
	}
}
