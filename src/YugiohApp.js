/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsByNameLocal2,
	reinicio,
} from './store/slices/cards/CardsAccions'
import { CardGrid } from './components/helpers/CardGrid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
	Alert,
	CircularProgress,
	Fade,
	Grow,
	Pagination,
	Typography,
} from '@mui/material'
import { useTranslation, Trans, i18n } from 'react-i18next'
import stiker2 from './styles/stiker2.png'
import handles from './components/buscadorHandles/handles'

export const YugiohApp = () => {
	// variables

	const { t, i18n } = useTranslation()
	const [check, setCheck] = useState(false)
	const dispatch = useDispatch()
	const [search, setsearch] = useState()
	const {
		cards = [],
		isLoading,
		msgError,
		tarjeta,
		count,
	} = useSelector(state => state.cards)
	const pageSize = 12
	const [pagination, setPagination] = useState({
		from: 0,
		to: pageSize,
	})

	// llamada a las cartas y paginacion

	useEffect(() => {
		dispatch(getcardsByNameLocal2(search, pagination))
		return () => {
			dispatch(reinicio())
		}
	}, [pagination.from, pagination.to])

	// handles

	const { handleChange, handleSubmit, checked } = handles(
		pageSize,
		pagination,
		setPagination,
		search,
		dispatch,
		getcardsByNameLocal2,
		setCheck,
		cards,
	)

	return (
		<div className='general'>
			<Navbar />
			<Fade
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 1000 } : {})}
			>
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
			</Fade>
			<div>
				<Box
					onSubmit={handleSubmit}
					component='form'
					style={{
						backgroundColor: 'white',
						color: 'white',
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
						onChange={e => {
							setsearch(e.target.value)
						}}
					/>
				</Box>

				{/* ver si hay cartas o no */}

				{cards.length < 1 ? (
					<div>
						{/* imagen */}

						<Box
							sx={{
								textAlign: 'center',
							}}
						>
							<Grow
								in={checked}
								style={{ transformOrigin: '0 0 0' }}
								{...(checked ? { timeout: 1000 } : {})}
							>
								<img className='imagenBusqueda' src={stiker2} alt='image' />
							</Grow>
						</Box>

						{/* mensaje */}

						<Typography
							justifyContent={'center'}
							variant='h5'
							component='h5'
							className='principalTitle'
							sx={{
								fontFamily: 'Nunito Sans',
								fontWeight: 500,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							<Trans i18nKey='missingCard'>There is no card</Trans>
						</Typography>
					</div>
				) : (
					''
				)}

				{/* circular progress */}

				{isLoading ? (
					<Box sx={{ display: 'flex' }} justifyContent='center'>
						<CircularProgress />
					</Box>
				) : (
					<CardGrid />
				)}

				{/* paginacion  */}

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
		</div>
	)
}
