/* eslint-disable no-unused-vars */
import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getcardsByTypeLOCAL } from '../../store/slices/CardsAccions'
import { useDispatch, useSelector } from 'react-redux'

const pageSize = 3

export const AppPagination = () => {
	const { cards = [] } = useSelector(state => state.cards)
	const dispatch = useDispatch()
	const type = 'Normal Monster'

	const [pagination, setPagination] = useState({
		count: 0,
		from: 0,
		to: pageSize,
	})

	return (
		<Box
			color={'white'}
			justifyContent={'center'}
			alignItems={'center'}
			display={'flex'}
			sx={{
				margin: '20px 0px',
			}}
		>
			<Pagination count={Math.ceil(pagination.count / pageSize)} />
		</Box>
	)
}
