/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByNameLocal2, reinicio } from './store/slices/thunks'
import { CardGrid } from './store/slices/helpers/CardGrid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

import '@fontsource/roboto/500.css'

export const YugiohApp = () => {
	const dispatch = useDispatch()
	const [search, setsearch] = useState('')
	const {
		cards = [],
		isLoading,
		page,
		msgError,
	} = useSelector(state => state.cards)
	console.log('🚀 ~ YugiohApp ~ cards:', cards)

	useEffect(() => {
		dispatch(getcardsByNameLocal2(search))
		// return () => {
		// 	dispatch(reinicio())
		// 	console.log('esta paja se reinicio en teoria')
		// }
	}, [])

	const handleInputChange = e => {
		setsearch(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (search.trim()) {
			dispatch(getcardsByNameLocal2(search))
		}
	}

	const handlePrevPage = () => {
		{
			dispatch(getcardsByNameLocal2(search, page - 2))
		}
		console.log(page)
	}
	const handleNextpage = () => {
		dispatch(getcardsByNameLocal2(search, page))
	}
	console.log(page)

	console.log(search)

	return (
		<div className='general'>
			<Navbar />
			<Typography variant='h2' component='h3' className='principalTitle'>
				Which card do you want to search?
			</Typography>
			<div>
				<Box
					className='inputbusqueda'
					onSubmit={handleSubmit}
					component='form'
					sx={{
						'& > :not(style)': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete='off'
				>
					<TextField
						id='outlined-basic'
						label='Search a Card'
						variant='outlined'
						margin='normal'
						onChange={e => {
							setsearch(e.target.value)
						}}
					/>
				</Box>

				<CardGrid />
			</div>

			<Stack spacing={2} direction='row' justifyContent='center'>
				<Button
					variant='outlined'
					className='butonspage'
					size='large'
					disabled={isLoading || page <= 2}
					onClick={handlePrevPage}
				>
					PREV
				</Button>
				<Button
					variant='outlined'
					className='butonspage'
					size='large'
					disabled={isLoading || cards.length < 12}
					onClick={handleNextpage}
				>
					NEXT
				</Button>
			</Stack>
		</div>
		// </div>
	)
}
