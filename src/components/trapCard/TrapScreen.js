/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsByTypeLOCAL,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
import { CardGrid } from '../CardGrid/CardGrid'

import { Box, CircularProgress, Pagination } from '@mui/material'

export const TrapScreen = () => {
	const dispatch = useDispatch()
	const {
		cards = [],
		tarjeta,
		count,
		isLoading,
	} = useSelector(state => state.cards)
	const type = 'Trap Card'

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
			<Navbar />

			{/* circular progress */}

			{isLoading ? (
				<Box sx={{ display: 'flex' }} justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<CardGrid />
			)}

			<Box
				className='pagination'
				spacing={2}
				sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
			>
				<Pagination
					color='warning'
					count={Math.ceil(count / pageSize)}
					onChange={handleChange}
				/>
			</Box>
		</div>
	)
}
