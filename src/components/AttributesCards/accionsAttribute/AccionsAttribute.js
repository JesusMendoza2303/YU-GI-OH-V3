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
	getcardsLocal,
	getcardsLocalByid,
	reinicio,
	remove,
} from '../../../store/slices/cards/CardsAccions'
import { useNavigate } from 'react-router-dom'

export const AccionsAttribute = (params, rowId, setRowId) => {
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = () => {
		console.log('sumitiado')
		// setLoading(true)

		// console.log(params.params.row)

		// const { id } = params.params
		// const idrow = id
		// console.log('🚀 ~ handleSubmit ~ idrow:', idrow)

		// const {
		// 	name,
		// 	type,
		// 	atk,
		// 	def,
		// 	desc,
		// 	firstdate,
		// 	lastdate,
		// 	race,
		// 	level,
		// 	card_images,
		// } = params.params.row
		// console.log(card_images)

		// const naipe = {
		// 	name,
		// 	type,
		// 	atk,
		// 	def,
		// 	desc,
		// 	firstdate,
		// 	lastdate,
		// 	race,
		// 	level,
		// 	card_images,
		// }

		// console.log('esto es params', params.params)
		// console.log('esto es rowId', rowId)
		// console.log('esto es naipe', naipe)

		// dispatch(editCardGrid(idrow, naipe))

		// setLoading(false)
		// setSuccess(true)
	}

	const handledelete = () => {
		console.log('borrao')
		// const { id } = params.params
		// const cardsid = id
		// if (confirm('are you sure to delete this card?') === true) {
		// 	dispatch(remove(cardsid)).then(res => {
		// 	dispatch(getcardsLocal())
		// 	})
		// }
	}

	return (
		<div>
			{/* boton de edicion */}

			<Fab
				color='warning'
				sx={{
					width: 40,
					height: 40,
					margin: 1,
				}}
			>
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
					<div
						// disabled={params.params.id !== rowId || loading}

						onClick={handleSubmit}
					>
						<Save />
					</div>
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
		</div>
	)
}
