/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { getcardsByRace, reinicio, remove } from '../../store/slices/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

import {
	Box,
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
	FormControlLabel,
	Menu,
	MenuItem,
	Stack,
	TextField,
	createFilterOptions,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { races } from '../data/Races'
import { green } from '@mui/material/colors'
import { createRace, getRaces } from '../../store/slices/RacesThunks'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import CircularProgress from '@mui/material/CircularProgress'

const filter = createFilterOptions()

export const RaceScreen = () => {
	// const [value, setValue] = useState('')
	const { races = [] } = useSelector(state => state.races)
	console.log('🚀 ~ RaceScreen ~ races:', races)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getRaces())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// estados
	const [id, setId] = useState(0)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const timer = React.useRef()
	const [agreeterm, agreetermchange] = useState(true)
	const [open2, openchange] = useState(false)
	const [name, setName] = useState('')

	// manejar el menu

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const navigate = useNavigate()

	// manejar el boton de borrado

	const handleDeleteClick = () => {
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove())
			console.log('borrado').then(res => {
				dispatch(getcardsByRace())
			})
		}
	}

	// apertura y cierre del popup

	const addAttribute = () => {
		openpopup()
	}
	const closepopup = () => {
		openchange(false)
	}
	const openpopup = () => {
		openchange(true)
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
			headerName: 'actions',
			sortable: false,
			width: 160,
			cellClassName: 'actions',
			renderCell: params => (
				<div>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<ArrowDropDownIcon />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleClose}>
							<EditIcon
								color='warning'
								sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
							/>
							Edit
						</MenuItem>
						<MenuItem onClick={handleDeleteClick}>
							<DeleteIcon
								color='error'
								sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
							/>
							Delete
						</MenuItem>
					</Menu>
				</div>
			),

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

	return (
		<div className='general'>
			<Navbar />

			{/* boton de creacion */}

			<Box sx={{ margin: '1%' }}>
				<div style={{ margin: '1%' }}>
					<Button
						className='createboton'
						onClick={addAttribute}
						startIcon={<AddCircleIcon />}
						variant='cotained'
					>
						Create a Card
					</Button>
				</div>
			</Box>

			<DataGrid
				columns={columns}
				className='datagrid'
				rows={races}
				getRowId={row => {
					return row.id
				}}
				//	onCellEditCommit={params => setRowId(params.row.id)}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				slots={{ toolbar: GridToolbar }}
				disableRowSelectionOnClick
			/>

			{/* formulario */}

			<Dialog open={open2} onClose={closepopup} fullWidth maxWidth='sm'>
				<DialogTitle>
					{<AddReactionIcon />}
					<span>Create a new race!</span>

					<Button
						color='secondary'
						// ariant='contained'
						style={{ left: 250 }}
						onClick={closepopup}
					>
						<CloseIcon />
					</Button>
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

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
							</Box>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
