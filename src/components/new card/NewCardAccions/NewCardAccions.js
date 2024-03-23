/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Check, Delete, Save, Visibility } from '@mui/icons-material'
import { Box, CircularProgress, Fab, Grow, Tooltip } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	editCardGrid,
	getcardsGrid,
	reinicio,
	remove,
} from '../../../store/slices/cards/CardsAccions'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BotonEditarGrid } from '../../helpers/BotonEditarGrid'
import { BotonEliminarGrid } from '../../helpers/BotonEliminarGrid'
import { BotonViewGrid } from '../../helpers/BotonViewGrid'

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

		const idrow = id

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

		const cardsid = id

		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove(cardsid)).then(res => {
				dispatch(getcardsGrid())
			})
		}
	}

	const handleNavigate = () => {
		navigate(`/${params.id}`)
		dispatch(reinicio())
	}

	if (success) {
		setTimeout(() => {
			setSuccess(false)
		}, 1000)
	}

	return (
		<div>
			{/* boton de edicion */}

			<BotonEditarGrid
				dataEdit={{
					success,
					checked,
					green,
					loading,
					params,
					handleSubmit,
					rowId,
				}}
			/>

			{/* boton de view */}

			<BotonViewGrid dataView={{ checked, handleNavigate }} />

			{/* boton de eliminacion */}
			<BotonEliminarGrid dataDelete={{ checked, handledelete }} />

			<Outlet />
		</div>
	)
}
