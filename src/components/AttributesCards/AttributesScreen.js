/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { reinicio, remove } from '../../store/slices/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import {
	createAttribute,
	getAttributes,
	removeAttribute,
} from '../../store/slices/AttributesThunk'
import { attributes } from '../data/Attributes'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@mui/material/colors'
import CircularProgress from '@mui/material/CircularProgress'
import {
	createFilterOptions,
	Checkbox,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
	Box,
	Avatar,
	Snackbar,
	MenuItem,
	Menu,
	Fab,
} from '@mui/material'

const filter = createFilterOptions()

export const AttributesScreen = () => {
	// const [value, setValue] = useState('')
	const { attributes = [] } = useSelector(state => state.attributes)
	console.log('🚀 ~ attributes:', attributes)

	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const timer = React.useRef()
	const [agreeterm, agreetermchange] = useState(true)

	const [open2, openchange] = useState(false)

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const [title, setTitle] = useState('')
	const [id, setId] = useState(0)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const navigate = useNavigate()

	// cierre del menu

	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		dispatch(getAttributes())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// manejar la opcion de borrado

	const handleDeleteClick = () => {
		if (confirm('are you sure to delete this card?') === true) {
			//	dispatch(removeAttribute())
			console.log('borrado').then(res => {
				dispatch(getAttributes())
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

	// columns

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
		const name = title.toLocaleUpperCase()
		const newAttribute = { id, name }
		dispatch(createAttribute(newAttribute)).then(res => {
			dispatch(getAttributes())
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
				rows={attributes}
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
					<span>Create a new attribute!</span>

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
								error={title.trim().length < 2}
								name='name'
								value={title}
								onChange={e => {
									setTitle(e.target.value)
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
										disabled={!agreeterm || title.trim().length < 2}
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
