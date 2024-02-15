import { cardsApi } from '../../api/cardsApi'
import { addcards, setCards, startLoadingCards } from './cardsSlice'

export const getcardsByType = (type, page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCards())
    const { data } = await cardsApi.get(`?type=${type}&num=12&offset=${page * 10}`)
    dispatch(setCards({ cards: data.data, page: page + 1 }))
  }
}

export const getcardsByID = (cardsid) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCards())
    const { data } = await cardsApi.get(`?id=${cardsid}`)
    dispatch(setCards({ cards: data.data }))
  }
}
export const getcardsByName = (search, page = 0) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoadingCards())
      const { data } = await cardsApi.get(`?fname=${search}&num=12&offset=${page * 10}`)
      dispatch(setCards({ cards: data.data, page: page + 1 }))
    } catch (error) {
      const msgError = 'Carta no encontrada'
      dispatch(setCards({ msgError }))
    }
  }
}

export const getcards = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCards())
    const { data } = await cardsApi.get(`?num=10&offset=${page * 10}`)
    dispatch(setCards({ cards: data.data, page: page + 1 }))
  }
}

export const createcards = (page = 0, naipe) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCards())
    const { data } = await cardsApi.post(`?num=12&offset=${page * 10}`, naipe)
    dispatch(addcards({ naipe, cards: data.data, page: page + 1 }))
    console.log('🚀 ~ return ~ data:', data)
    console.log('🚀 ~ return ~ naipe desde el thunk:', naipe)
  }
}
