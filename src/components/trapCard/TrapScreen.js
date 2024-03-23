/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsByTypeLOCAL,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
import { Index } from '../helpers/Index'
import handles from '../helpers/handlesCards/handles'

export const TrapScreen = () => {
	const dispatch = useDispatch()
	const {
		cards = [],
		tarjeta,
		count,
		isLoading,
	} = useSelector(state => state.cards)
	const type = 'Trap Card'
	const [check, setCheck] = useState(true)
	const pageSize = 12
	const [pagination, setPagination] = useState({
		from: 0,
		to: pageSize,
	})

	// llamada a las cartas

	useEffect(() => {
		dispatch(getcardsByTypeLOCAL(type, pagination))

		return () => {
			dispatch(reinicio())
		}
	}, [pagination.from, pagination.to])

	// handles

	const { handleChange } = handles(pageSize, setPagination, pagination)

	return (
		<div className='general'>
			<Index data={{ check, count, pageSize, handleChange }} />
		</div>
	)
}
