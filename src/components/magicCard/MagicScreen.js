/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { CardGrid } from '../CardGrid/CardGrid'
import {
	getcardsByTypeLOCAL,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { Box, CircularProgress, Pagination } from '@mui/material'

export const MagicScreen = () => {
	const dispatch = useDispatch()
	const {
		cards = [],
		tarjeta,
		count,
		isLoading,
	} = useSelector(state => state.cards)
	const type = 'Spell Card'
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

<<<<<<< HEAD
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
=======
			<Stack spacing={2} direction='row' justifyContent='center'>
				<Button
					variant='outlined'
					className='butonspage'
					color='secondary'
					size='large'
					disabled={isLoading || page <= 2}
					onClick={handlePrevPage}
				>
					PREV
				</Button>
				<Button
					variant='outlined'
					className='butonspage'
					color='secondary'
					size='large'
					disabled={isLoading || cards.length < 12}
					onClick={handleNextpage}
				>
					NEXT
				</Button>
			</Stack>
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8
		</div>
	)
}
