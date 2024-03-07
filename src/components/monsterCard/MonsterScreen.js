/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByTypeLOCAL, reinicio } from '../../store/slices/thunks'
import { CardGridTarjeta } from '../../store/slices/helpers/CardGridTarjeta'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'

import { redirect } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

export const MonsterScreen = () => {
	const dispatch = useDispatch()
	const { cards = [], tarjeta, count } = useSelector(state => state.cards)
	console.log('🚀 ~ MonsterScreen ~ count:', count)

	console.log('🚀 ~ MonsterScreen ~ cards:', cards)

	const type = 'Normal Monster'
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

			<CardGridTarjeta />

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
