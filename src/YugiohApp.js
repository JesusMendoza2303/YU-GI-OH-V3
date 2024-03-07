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
import { useTranslation, Trans, i18n } from 'react-i18next'


const lngs = {
	en: { nativeName: 'English' },
	es: { nativeName: 'Spanish' },
}

export const YugiohApp = () => {
	const { t, i18n } = useTranslation()

	const dispatch = useDispatch()
	const [search, setsearch] = useState('')
	const { cards = [], isLoading, msgError } = useSelector(state => state.cards)

	useEffect(() => {
		dispatch(getcardsByNameLocal2(search))
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria')
		}
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

	console.log(search)

	return (
		<div className='general'>
			<Navbar />

			<div>
				{Object.keys(lngs).map(lng => (
					<Button
						type='submit'
						key={lng}
						onClick={() => i18n.changeLanguage(lng)}
						disabled={i18n.resolvedLanguage === lng}
					>
						{lngs[lng].nativeName}
					</Button>
				))}
			</div>

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

				<CardGrid />
			</div>
		</div>
		// </div>
	)
}
