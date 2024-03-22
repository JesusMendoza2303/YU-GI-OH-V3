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
import { Box, CircularProgress, Fab, Grow, Tooltip } from '@mui/material'
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

export const NewCardAccions = data => {
	const params = data.data.params

	const rowId = data.data.rowId

	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [checked, setChecked] = useState(true)
	const navigate = useNavigate()

	const handleSubmit = () => {
		setLoading(true)

		const id = params.id
		console.log('🚀 ~ handleSubmit ~ id:', id)
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
		} = params.row
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

		dispatch(editCardGrid(idrow, naipe))

		setLoading(false)

		setSuccess(true)
	}

	const handledelete = () => {
		const id = params.id
		console.log('🚀 ~ handledelete ~ id:', id)
		const cardsid = id
		console.log('🚀 ~ handledelete ~ cardsid:', cardsid)
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove(cardsid)).then(res => {
				dispatch(getcardsGrid())
			})
		}
	}

	const handleNavigate = () => {
		console.log('navegar', params.id)
		navigate(`/${params.id}`)
		dispatch(reinicio())
	}

	return (
		<div>
			{/* boton de edicion */}

			{success ? (
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
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
				</Grow>
			) : (
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Fab
						color='info'
						sx={{
							width: 40,
							height: 40,
							margin: 1,
						}}
						disabled={loading || params.id !== rowId}
						onClick={
							// console.log ('this is paramsid:', params.params.id, 'this is rowid:', rowId)
							handleSubmit
						}
					>
						<Save />
					</Fab>
				</Grow>
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

			<Grow
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 1500 } : {})}
			>
				<Fab
					color='warning'
					sx={{
						width: 40,
						height: 40,
						margin: 1,
					}}
					onClick={handleNavigate}
				>
					<Visibility />
				</Fab>
			</Grow>

			{/* boton de eliminacion */}
			<Grow
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 2000 } : {})}
			>
				<Fab
					color='error'
					sx={{
						width: 40,
						height: 40,
						margin: 1,
					}}
					onClick={handledelete}
				>
					<Delete />
				</Fab>
			</Grow>

			<Outlet />
		</div>
	)
}
