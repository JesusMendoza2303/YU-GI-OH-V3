/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByTypeLOCAL, reinicio } from '../../store/slices/thunks'
import { CardGrid } from '../../store/slices/helpers/CardGrid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import '@fontsource/roboto/500.css'
import { redirect } from 'react-router-dom'

export const MonsterScreen = () => {
	const dispatch = useDispatch()
	const { cards = [], isLoading, page = 0 } = useSelector(state => state.cards)
	console.log('🚀 ~ MonsterScreen ~ cards:', cards)

	const type = 'Normal Monster'

	useEffect(() => {
		dispatch(getcardsByTypeLOCAL(type))
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria list')
		}
	}, [])

	const handlePrevPage = () => {
		{
			dispatch(getcardsByTypeLOCAL(type, page - 2))
		}
		console.log(page)
	}
	const handleNextpage = () => {
		dispatch(getcardsByTypeLOCAL(type, page))
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
