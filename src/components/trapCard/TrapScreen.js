/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByTypeLOCAL, reinicio } from '../../store/slices/thunks'
import { CardGrid } from '../../store/slices/helpers/CardGrid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import '@fontsource/roboto/500.css'

export const TrapScreen = () => {
	const dispatch = useDispatch()
	const { cards = [], isLoading, page = 0 } = useSelector(state => state.cards)
	console.log('🚀 ~ TrapScreen ~ cards:', cards)
	const type = 'Trap Card'

	useEffect(() => {
		dispatch(getcardsByTypeLOCAL(type))
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria')
		}
	}, [])

	const handlePrevPage = () => {
		if (page > 0) {
			{
				dispatch(getcardsByTypeLOCAL(type, page - 2))
			}
			console.log(page)
		} else {
			dispatch(getcardsByTypeLOCAL(type, page))
		}
	}
	const handleNextpage = () => {
		if (page > 0) {
			{
				dispatch(getcardsByTypeLOCAL(type, page))
			}
		} else {
			dispatch(getcardsByTypeLOCAL(type, page))
		}
	}
	console.log(page)
	return (
		<div className='general'>
			<Navbar />

			<CardGrid />

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
	)
}
