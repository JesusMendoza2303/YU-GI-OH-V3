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

export const AttributtesAccions = data => {
	const params = data.data.params
	const rowId = data.data.rowId

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [checked, setChecked] = useState(true)

	const handledelete = () => {
		const id = params.id
		const attributeId = id

		if (confirm('are you sure to delete this attribute?') === true) {
			dispatch(removeAttribute(attributeId)).then(res => {
				dispatch(getAttributes())
			})
		}
	}

	const handleSubmit = () => {
		setLoading(true)
		const id = params.id
		const idrow = id
		console.log('🚀 ~ handleSubmit ~ idrow:', idrow)
		const { name } = params.row
		console.log('🚀 ~ handleSubmit ~ name:', name)

		const naipe = {
			name,
		}
		dispatch(editAttribute(idrow, naipe))

		setLoading(false)
		setSuccess(true)
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

			{/* boton de eliminacion */}
			<BotonEliminarGrid dataDelete={{ checked, handledelete }} />
		</div>
	)
}
