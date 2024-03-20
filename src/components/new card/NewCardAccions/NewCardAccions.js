/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {
	Check,
	Delete,
	PanoramaSharp,
	PanoramaVerticalSelect,
	Save,
	Visibility,
} from '@mui/icons-material'
import { Box, CircularProgress, Fab, Tooltip } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	editCardGrid,
	getcardsGrid,
	getcardsLocal,
	getcardsLocalByid,
	reinicio,
	remove,
} from '../../../store/slices/cards/CardsAccions'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export const NewCardAccions = (params, rowId, values) => {
	console.log('params id:', params.params.id, 'rowid', rowId, 'values', values)

	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = () => {
		setLoading(true)

		const { id } = params.params
		const idrow = id
		console.log('🚀 ~ handleSubmit ~ idrow:', idrow)

		const {
			name,
			type,
			atk,
			def,
			desc,
			firstdate,
			lastdate,
			race,
			level,
			card_images,
		} = params.params.row
		console.log(card_images)

		const naipe = {
			name,
			type,
			atk,
			def,
			desc,
			firstdate,
			lastdate,
			race,
			level,
			card_images,
		}

		console.log('esto es params', params.params)
		console.log('esto es rowId', rowId)
		console.log('esto es naipe', naipe)

		dispatch(editCardGrid(idrow, naipe))

		setLoading(false)

		setSuccess(true)
	}

	const handledelete = () => {
		const { id } = params.params
		const cardsid = id
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove(cardsid)).then(res => {
				dispatch(getcardsGrid())
			})
		}
	}

	const handleNavigate = () => {
		console.log('rowid:', rowId)
		console.log('navegar', params.params.id)
		navigate(`/${params.params.id}`)
		dispatch(reinicio())
	}

	return (
		<div>
			{/* boton de edicion */}

			{success ? (
				<Fab
					color='primary'
					sx={{
						width: 40,
						height: 40,
						bgcolor: green[500],
						'&:hover': { bgcolor: green[700] },
					}}
				>
					<Check />
				</Fab>
			) : (
				<Fab
					color='info'
					sx={{
						width: 40,
						height: 40,
						margin: 1,
					}}
					// disabled={ loading || params.params.id !== rowId }

					onClick={
						// console.log ('this is paramsid:', params.params.id, 'this is rowid:', rowId)
						handleSubmit
					}
				>
					<Save />
				</Fab>
			)}

			{loading && (
				<CircularProgress
					size={52}
					sx={{
						color: green[500],
						position: 'absolute',
						top: -6,
						left: -6,
						zIndex: 1,
					}}
				/>
			)}

			{/* boton de view */}

			<Fab
				color='warning'
				sx={{
					width: 40,
					height: 40,
					margin: 1,
				}}
				onClick={handleNavigate}
			>
				{/* <Link to={`/${params.params.id}`} className='linkCards'> */}
				<Visibility />
				{/* </Link> */}
			</Fab>

			{/* boton de eliminacion */}

			<Fab
				color='error'
				sx={{
					width: 40,
					height: 40,
					margin: 1,
				}}
				// disabled={params.params.id !== rowId || loading}
				onClick={handledelete}
			>
				<Delete />
			</Fab>

			<Outlet />
		</div>
	)
}
