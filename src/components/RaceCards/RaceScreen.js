/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { reinicio, remove } from '../../store/slices/cards/CardsAccions'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

import {
	Box,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	Fade,
	FormControlLabel,
	Grow,
	Menu,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Typography,
	createFilterOptions,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
import { createRace, getRaces } from '../../store/slices/races/RacesAccions'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation, Trans, i18n } from 'react-i18next'
import { RaceAccions } from './raceAccions/RaceAccions'
import Draggable from 'react-draggable'

const filter = createFilterOptions()

export const RaceScreen = () => {
	const { t, i18n } = useTranslation()
	// const [value, setValue] = useState('')
	const { races = [] } = useSelector(state => state.races)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getRaces())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// estados
	const [rowId, setRowId] = useState(null)
	const [id, setId] = useState(0)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const timer = React.useRef()
	const [agreeterm, agreetermchange] = useState(false)
	const [open2, openchange] = useState(false)
	const [name, setName] = useState('')
	const [checked, setChecked] = useState(true)

	// manejar el menu

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	// manejar el boton de borrado

	const handleDeleteClick = () => {
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove())
			console.log('borrado').then(res => {
				dispatch(getRaces())
			})
		}
	}

	// apertura y cierre del popup

	const openPopupButton = () => {
		openpopup()
		clearState()
	}
	const closepopup = () => {
		openchange(false)
	}
	const openpopup = () => {
		openchange(true)
	}

	// limpiar le estado para que el formulario aparezca vacio

	const clearState = () => {
		setName('')
	}

	// esto es el apartado visual del boton de carga

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	}

	const columns = useMemo(() => [
		{
			field: 'id',
			headerName: 'ID',
			width: 100,
			editable: true,
		},
		{
			field: 'name',
			headerName: 'name',
			width: 150,
			editable: true,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 300,
			cellClassName: 'actions',
			renderCell: params => <RaceAccions {...{ params, rowId, setRowId }} />,

			filterable: false,
		},
	])

	const handleSubmit = e => {
		e.preventDefault()
		const newRace = { id, name }
		dispatch(createRace(newRace)).then(res => {
			dispatch(getRaces())
			closepopup()
		})
	}

	function PaperComponent(props) {
		return (
			<Draggable
				handle='#draggable-dialog-title'
				cancel={'[class*="MuiDialogContent-root"]'}
			>
				<Paper {...props} />
			</Draggable>
		)
	}

	return (
		<div className='general'>
			<Navbar />

			<Box sx={{ margin: '1%', backgroundColor: 'white' }}>
				{/* boton de creacion */}

				<div style={{ margin: '1%' }}>
					<Grow
						in={checked}
						style={{ transformOrigin: '0 0 0' }}
						{...(checked ? { timeout: 1000 } : {})}
					>
						<Button
							className='createboton'
							onClick={openPopupButton}
							startIcon={<AddCircleIcon />}
							variant='cotained'
						>
							<Typography
								sx={{
									fontFamily: 'Nunito Sans',
									fontWeight: 600,
								}}
							>
								<Trans i18nKey='crateRace'>Create a Race</Trans>
							</Typography>
						</Button>
					</Grow>
				</div>

				<DataGrid
					columns={columns}
					className='datagrid'
					rows={races}
					getRowId={row => row.id}
					onRowClick={params => setRowId(params.id)}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					slots={{ toolbar: GridToolbar }}
				/>
			</Box>

			{/* formulario */}

			<Dialog
				open={open2}
				onClose={closepopup}
				fullWidth
				maxWidth='sm'
				aria-labelledby='draggable-dialog-title'
				PaperComponent={PaperComponent}
			>
				<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
					{<AddReactionIcon />}
					<span>
						<Trans i18nKey='formRaceTitle'>Create a new race!</Trans>
					</span>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<Stack spacing={2} margin={2}>
							<TextField
								required
								error={name.trim().length < 2}
								name='name'
								value={name}
								onChange={e => {
									setName(e.target.value)
								}}
								variant='outlined'
								label='name'
							></TextField>

							<FormControlLabel
								checked={agreeterm}
								onChange={e => {
									agreetermchange(e.target.checked)
								}}
								control={<Checkbox></Checkbox>}
								label='Agree Terms & Conditions'
							></FormControlLabel>

							{/* boton de guardado */}

							{/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Box sx={{ m: 1, position: 'relative' }}>
									<Fab
										aria-label='save'
										type='submit'
										disabled={!agreeterm || name.trim().length < 2}
										color='secondary'
										sx={buttonSx}
										onClick={handleSubmit}
									>
										{success ? <CheckIcon /> : <SaveIcon />}
									</Fab>
									{loading && (
										<CircularProgress
											size={68}
											sx={{
												color: green[500],
												position: 'absolute',
												top: -6,
												left: -6,
												zIndex: 1,
											}}
										/>
									)}
								</Box>
							</Box> */}
						</Stack>
					</form>
				</DialogContent>

				{/* nuevos botones de guardado y cierre */}

				<DialogActions>
					<Button
						onClick={handleSubmit}
						disabled={!agreeterm || name.trim().length < 2}
						color='secondary'
						type='submit'
						aria-label='save'
						sx={buttonSx}
					>
						Submit
					</Button>
					<Button onClick={closepopup}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
