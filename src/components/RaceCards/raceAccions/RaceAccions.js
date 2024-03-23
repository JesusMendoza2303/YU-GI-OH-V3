/* eslint-disable no-unused-vars */
import { Check, Delete, Save } from '@mui/icons-material'
import { CircularProgress, Fab, Grow } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
	editRaces,
	getRaces,
	removeRaces,
} from '../../../store/slices/races/RacesAccions'
import { BotonEliminarGrid } from '../../helpers/BotonEliminarGrid'
import { BotonEditarGrid } from '../../helpers/BotonEditarGrid'

export const RaceAccions = data => {
	const params = data.data.params
	console.log('🚀 ~ RaceAccions ~ params:', params)

	const rowId = data.data.rowId

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [checked, setChecked] = useState(true)

	const handledelete = () => {
		const id = params.id
		const raceId = id

		if (confirm('are you sure to delete this attribute?') === true) {
			dispatch(removeRaces(raceId)).then(res => {
				dispatch(getRaces())
			})
		}
	}

	if (success) {
		setTimeout(() => {
			setSuccess(false)
		}, 1000)
	}

	const handleSubmit = () => {
		setLoading(true)

		const id = params.id
		const idrow = id

		const { name } = params.row

		const race = {
			name,
		}
		console.log('🚀 ~ handleSubmit ~ race:', race)

		dispatch(editRaces(idrow, race))

		setLoading(false)
		setSuccess(true)
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

			{/* boton de eliminacion */}

			<BotonEliminarGrid dataDelete={{ checked, handledelete }} />
		</div>
	)
}
