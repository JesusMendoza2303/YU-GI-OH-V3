/* eslint-disable no-unused-vars */
import {
	Check,
	Delete,
	PanoramaSharp,
	PanoramaVerticalSelect,
	Save,
	Visibility,
} from '@mui/icons-material'
import { Box, CircularProgress, Fab, Tooltip, Grow } from '@mui/material'
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
import {
	editAttribute,
	getAttributes,
	removeAttribute,
} from '../../../store/slices/attributes/AttributesAccions'
import { BotonEditarGrid } from '../../helpers/BotonEditarGrid'
import { BotonEliminarGrid } from '../../helpers/BotonEliminarGrid'
import handlesAccions from '../handles/handlesAccions'

export const AttributtesAccions = data => {
	const params = data.data.params
	const rowId = data.data.rowId

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [checked, setChecked] = useState(true)

	// handles

	const { handleSubmit, handledelete } = handlesAccions(
		setLoading,
		params,
		dispatch,
		editAttribute,
		setSuccess,
		success,
		removeAttribute,
		getAttributes,
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
