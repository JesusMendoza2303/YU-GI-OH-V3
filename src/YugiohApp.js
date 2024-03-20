/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsByNameLocal2,
	reinicio,
} from './store/slices/cards/CardsAccions'
import { CardGrid } from './components/CardGrid/CardGrid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { CircularProgress, Pagination, Typography } from '@mui/material'
import { useTranslation, Trans, i18n } from 'react-i18next'

export const YugiohApp = () => {
	const { t, i18n } = useTranslation()

	const dispatch = useDispatch()
	const [search, setsearch] = useState('')
	const {
		cards = [],
		isLoading,
		msgError,
		tarjeta,
		count,
	} = useSelector(state => state.cards)

	const pageSize = 12

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
<<<<<<< HEAD
		dispatch(getcardsByNameLocal2(search, pagination))
		return () => {
			dispatch(reinicio())
		}
	}, [pagination.from, pagination.to])
=======
		dispatch(getcardsByNameLocal2(search))
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria')
		}
	}, [])
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8

	const handleInputChange = e => {
		setsearch(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (search.trim()) {
			dispatch(getcardsByNameLocal2(search, pagination))
		}
	}

<<<<<<< HEAD
=======

	console.log(search)

>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8
	return (
		<div className='general'>
			<Navbar />

			<Typography
				justifyContent={'center'}
				variant='h3'
				component='h3'
				className='principalTitle'
				sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'Namdhinggo',
					fontWeight: 500,
					letterSpacing: '.3rem',
					textDecoration: 'none',
				}}
			>
				<Trans i18nKey='which'>WHICH CARD DO YOU WANT TO SEARCH?</Trans>
			</Typography>

			<div>
				<Box
					onSubmit={handleSubmit}
					component='form'
					style={{
						backgroundColor:'#2D2A36',
						color:'white',
						
				
				}}
					sx={{
						padding: '7px 10px 7px 10px',
						margin: 3,
						width: 500,
						maxWidth: '100%',
						backgroundColor: 'white',
						color: 'white',
						borderRadius: '3px',
					}}
					noValidate
					autoComplete='off'
				>
					<TextField
						fullWidth
						id='fullWidth'
						label='Search a Card'
						variant='standard'
						margin='normal'
						style={{
							backgroundColor:'#2D2A36',
							color:'white'
					
					}}
						
						onChange={e => {
							setsearch(e.target.value)
						}}
					/>
				</Box>
<<<<<<< HEAD

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
=======
				
				<CardGrid />
			</div>

			
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8
		</div>
	)
}
