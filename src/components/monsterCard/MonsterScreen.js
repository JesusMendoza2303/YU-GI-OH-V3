/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsByTypeLOCAL,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
import { CardGrid } from '../helpers/CardGrid'

import { Box, CircularProgress, Grow, Pagination } from '@mui/material'

import { Index } from '../helpers/Index'

export const MonsterScreen = () => {
	const dispatch = useDispatch()
	const {
		cards = [],
		tarjeta,
		count,
		isLoading,
	} = useSelector(state => state.cards)

	const type = 'Normal Monster'
	const [check, setCheck] = useState(true)

	const pageSize = 12

	// esto es para la paginacion

	const handleChange = (event, page) => {
		const from = (page - 1) * pageSize
		const to = (page - 1) * pageSize + pageSize
		setPagination({ ...pagination, from, to })
	}

	const [pagination, setPagination] = useState({
		from: 0,
		to: pageSize,
	})

	useEffect(() => {
		dispatch(getcardsByTypeLOCAL(type, pagination))

		return () => {
			dispatch(reinicio())
		}
	}, [pagination.from, pagination.to])
	return (
		<div className='general'>
			<Index data={{ check, count, pageSize, handleChange }} />
		</div>
	)
}
