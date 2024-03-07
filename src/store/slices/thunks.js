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

export const getcardsByTypeLOCAL = (type, pagination, tarjeta, count) => {
	console.log('🚀 ~ getcardsByTypeLOCAL ~ pagination:', pagination)
	return async (dispatch, getState, resolve, reject) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?type=${type}`)
		console.log('🚀 ~ return ~ cards:', cards)
		// .slice(pagination.from, pagination.to)
		const tarjeta = cards.data.slice(pagination.from, pagination.to)
		console.log('🚀 ~ return ~ tarjeta:', tarjeta)
		const count = cards.data.length
		console.log('🚀 ~ return ~ count:', count)

		dispatch(setCards({ cards: cards.data, tarjeta, count }))
	}
}

export const getcardsByRace = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(
			`data?race=Normal&race=Dragon&race=Beast&race=Reptile&race=Insect&race=Machine&race=Rock&race=Fish&race=Fiend&race=Spellcaster&race=Plant&race=Warrior&race=Dinosaur&race=Aqua&race=Zombie&race=Sea Serpent&race=Beast-Warrior&race=Fairy&race=Cyberse&race=Pyro&race=Winged Beast&race=Thunder&race=Psychic`,
		)
		console.log('este es el value dentro de la busqueda:', value)
		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByRaceDetail = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?race=${value.name}`)
		console.log('este es el value dentro de la busqueda:', value)
		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByAttribute = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(
			`data?attribute=LIGHT&attribute=EARTH&attribute=FIRE&attribute=WIND&attribute=DARK&attribute=WATER`,
		)
		console.log('este es el value dentro de la busqueda:', value)
		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByAttributeDetail = value => {
	return async (dispatch, getState) => {
		dispatch(startLoadingCards())
		const cards = await cardsApiLocal.get(`data?attribute=${value.name}`)
		console.log('este es el value dentro de la busqueda:', value)
		dispatch(setCards({ cards: cards.data }))
	}
}

export const getcardsByNameLocal2 = search => {
	return async (dispatch, getState) => {
		try {
			dispatch(startLoadingCards())
			const cards = await cardsApiLocal.get(`data?name_like=${search}`)
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

export const remove = cardsid => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.delete(
			`http://localhost:3030/data/${cardsid}`,
		)
	}
}

export const editCard = (cardsid, naipe) => {
	console.log('🚀 ~ editCard ~ naipe:', naipe)
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.put(
			`http://localhost:3030/data/${cardsid}`,
			naipe,
		)
	}
}

export const createCard = naipe => {
	return async (dispatch, getState) => {
		const cards = await cardsApiLocal.post('http://localhost:3030/data', naipe)
	}
}
