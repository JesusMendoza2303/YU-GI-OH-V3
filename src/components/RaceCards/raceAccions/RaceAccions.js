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
import handles from '../handles/handle'

export const RaceAccions = data => {
	const params = data.data.params
	const rowId = data.data.rowId

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [checked, setChecked] = useState(true)

	// handles

	const { handledelete, handleSubmit } = handles(
		params,
		getRaces,
		success,
		setSuccess,
		removeRaces,
		setLoading,
		editRaces,
	)

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
