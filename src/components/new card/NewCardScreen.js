/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { createCard, getcardsLocal, reinicio } from '../../store/slices/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import {
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
	Autocomplete,
	createFilterOptions,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@mui/material/colors'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { DateField, Label, DateInput, DateSegment } from 'react-aria-components'
import { getRaces } from '../../store/slices/RacesThunks'
import { getAttributes } from '../../store/slices/AttributesThunk'

const filter = createFilterOptions()

export const NewCardScreen = () => {
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()
	const { races = [] } = useSelector(state => state.races)
	console.log('🚀 ~ NewCardScreen ~ races:', races)
	const { attributes = [] } = useSelector(state => state.attributes)
	console.log('🚀 ~ NewCardScreen ~ attributes:', attributes)

	const [rowId, setRowId] = useState(null)

	const dispatch = useDispatch()
	const { cards = [], isLoading } = useSelector(state => state.cards)

	const navigate = useNavigate()

	const [id] = useState(0)
	const [open, openchange] = useState(false)
	const [agreeterm, agreetermchange] = useState(true)
	const [card_images, setCard_images] = useState('')
	const [edit, setedit] = useState(false)
	const [remove, setremove] = useState(false)
	const [title, settitle] = useState('create a card')

	const [values, setValues] = useState({
		name: '',
		desc: '',
		atk: 0,
		def: 0,
		level: 1,
		race: '',
		type: '',
		attribute: '',
		firstdate: '',
		lastdate: '',
	})

	// esto es el apartado visual del boton de carga

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	}

	// esto es para el nuevo menu

	const [anchorEl, setAnchorEl] = React.useState(null)
	const openMenu = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		console.log('cerrado')
		setAnchorEl(null)
	}
	// const handleView = (params) => {
	// 	useEffect(() => {
	// 		console.log(params.row.id)
	// 	}, [])

	// 	// navigate(`/${params.row.id}`)
	// 	setAnchorEl(null);
	// }
	// //

	React.useEffect(() => {
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	const handleChange = e => {
		e.preventDefault()
		const { value, name } = e.target
		console.log('🚀 ~ handleChange ~ e.target:', e.target)
		setValues(preValues => ({
			...preValues,
			[name]: value,
		}))
	}

	useEffect(() => {
		dispatch(getRaces())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	useEffect(() => {
		dispatch(getAttributes())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	useEffect(() => {
		dispatch(getcardsLocal())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	const addCard = () => {
		setedit(false)
		openpopup()
	}

	const closepopup = () => {
		openchange(false)
	}
	const openpopup = () => {
		openchange(true)
		clearstate()
	}

	const handlesubmit = e => {
		// vaina que carga
		e.preventDefault()
		if (!loading) {
			setSuccess(false)
			setLoading(true)
			timer.current = window.setTimeout(() => {
				setSuccess(true)
				setLoading(false)
			}, 2000)
		}
		// logica
		const {
			name,
			desc,
			atk,
			def,
			level,
			race,
			type,
			firstdate,
			lastdate,
			attribute,
		} = values

		const imagesArray = []
		imagesArray.push({
			image_url: card_images,
		})

		const naipe = {
			id,
			name,
			desc,
			atk,
			def,
			level,
			race,
			attribute,
			type,
			firstdate,
			lastdate,
		}

		naipe.card_images = imagesArray

		dispatch(createCard(naipe)).then(res => {
			dispatch(getcardsLocal())

			closepopup()
		})
	}

	const columns = useMemo(() => [
		{
			field: 'id',
			headerName: 'ID',
			width: 90,
		},
		{
			field: 'card_images',
			headerName: 'image',
			width: 90,
			renderCell: params => (
				<Avatar src={params.row.card_images[0]?.image_url} />
			),
			sortable: false,
			filterable: false,
		},
		{
			field: 'name',
			headerName: 'name',
			width: 300,
			editable: true,
		},
		{
			field: 'type',
			headerName: 'type',
			type: 'singleSelect',
			width: 130,
			valueOptions: ['Normal Monter', 'Spell Card', 'Trap Card'],
			editable: true,
		},
		{
			field: 'desc',
			headerName: 'desc',
			width: 500,
			editable: true,
		},
		{
			field: 'atk',
			headerName: 'atk',
			type: 'number',
			width: 110,
		},
		{
			field: 'def',
			headerName: 'def',
			type: 'number',
			width: 110,
			editable: true,
		},
		{
			field: 'firstdate',
			headerName: 'creation date',
			type: 'Date',
			width: 110,
			editable: true,
		},
		{
			field: 'lastdate',
			headerName: 'first appearance in anime',
			type: 'Date',
			width: 130,
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
						aria-controls={openMenu ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={openMenu ? 'true' : undefined}
						onClick={handleClick}
					>
						<ArrowDropDownIcon />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={openMenu}
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
						<MenuItem onClick={handleClose}>
							<DeleteIcon
								color='error'
								sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
							/>
							Delete
						</MenuItem>
						<Button onClick={handleClose}>
							<RemoveRedEyeIcon
								color='warning'
								sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
							/>
							Read
						</Button>
					</Menu>
				</div>
			),

			filterable: false,
		},
	])

	const clearstate = () => {
		setCard_images('')
		setValues(preValues => ({
			...preValues,
			name: '',
			desc: '',
			atk: 0,
			def: 0,
			level: 1,
			race: '',
			type: '',
			firstdate: '',
			lastdate: '',
		}))
	}

	return (
		<div>
			{/* validar si esta cargando o no */}
			<Navbar />
			{isLoading ? (
				<Box sx={{ display: 'flex' }} className='circularProgress'>
					<CircularProgress />
				</Box>
			) : (
				<Box>
					<Snackbar open={true} autoHideDuration={1000}>
						<Alert severity='success'>Cards Loaded Succesfully.</Alert>
					</Snackbar>
				</Box>
			)}

			{/* boton de creacion */}

			<Box sx={{ margin: '1%' }}>
				<div style={{ margin: '1%' }}>
					<Button
						className='createboton'
						onClick={addCard}
						startIcon={<AddCircleIcon />}
						variant='cotained'
					>
						Create a Card
					</Button>
				</div>

				{/* Data grid */}

				<DataGrid
					columns={columns}
					className='datagrid'
					rows={cards}
					getRowId={row => {
						return row.id
					}}
					onCellEditCommit={params => setRowId(params.row.id)}
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
			</Box>

			{/* formulario */}

			<Dialog open={open} onClose={closepopup} fullWidth maxWidth='sm'>
				<DialogTitle>
					{<AddReactionIcon />}
					<span>Create a new card!</span>

					<Button
						color='secondary'
						// ariant='contained'
						style={{ left: 300 }}
						onClick={closepopup}
					>
						<CloseIcon />
					</Button>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handlesubmit}>
						<Stack spacing={2} margin={2}>
							{/* formulario de nombre */}

							<TextField
								required
								error={values.name.trim().length < 2}
								name='name'
								value={values.name}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='name'
							></TextField>

							{/* formulario de descripcion */}

							<TextField
								required
								error={values.desc.trim().length < 2}
								name='desc'
								value={values.desc}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='dec'
							></TextField>

							{/* formulario de imagenes */}

							<TextField
								required
								value={card_images}
								name='image'
								onChange={e => {
									setCard_images(e.target.value)
								}}
								variant='outlined'
								label='incerta la url de la imagen'
							></TextField>

							{/* formulario de nivel */}

							<TextField
								required
								type='number'
								error={values.level < 1}
								value={values.level}
								name='level'
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='level'
							></TextField>

							{/* formulario de tipos */}

							<RadioGroup required>
								<Typography variant='h6' textAlign={'center'}>
									What type of card is it?
								</Typography>

								<FormControlLabel
									name='type'
									value={'Normal Monster'}
									onChange={e => {
										handleChange(e)
									}}
									control={<Radio></Radio>}
									label='Normal Monster'
								></FormControlLabel>

								<FormControlLabel
									name='type'
									value={'Spell Card'}
									onChange={e => {
										handleChange(e)
									}}
									control={<Radio></Radio>}
									label='Spell Card'
								></FormControlLabel>

								<FormControlLabel
									name='type'
									value={'Trap Card'}
									onChange={e => {
										handleChange(e)
									}}
									control={<Radio></Radio>}
									label='Trap Card'
								></FormControlLabel>
							</RadioGroup>

							{/* formulario de raza */}

							<Autocomplete
								required
								value={values.race}
								name='race'
								onChange={e => {
									handleChange(e)
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params)

									const { inputValue } = params
									console.log('🚀 ~ CardsDetail ~ inputValue:', inputValue)

									// Suggest the creation of a new value
									// const isExisting = options.some((option) => inputValue === option.title);
									// if (inputValue !== '' && !isExisting) {
									//   filtered.push({
									//     inputValue,
									//     title: `Add "${inputValue}"`,
									//   });
									// }

									return filtered
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								id='free-solo-with-text-demo'
								options={races}
								getOptionLabel={option => {
									// Value selected with enter, right from the input
									if (typeof option === 'string') {
										return option
									}
									// Add "xxx" option created dynamically
									if (option.inputValue) {
										return option.inputValue
									}
									// Regular option

									return option.name
								}}
								renderOption={(props, option) => (
									<li {...props}>{option.name}</li>
								)}
								freeSolo
								renderInput={params => (
									<TextField
										{...params}
										label='Race'
										variant='outlined'
										fullWidth
										id='fullWidth'
										onChange={e => {
											handleChange(e)
										}}
									/>
								)}
							/>

							{/* formulario de atributo */}

							<Autocomplete
								required
								disabled={
									values.type === 'Spell Card' || values.type === 'Trap Card'
								}
								value={values.attribute}
								name='attribute'
								onChange={e => {
									handleChange(e)
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params)

									const { inputValue } = params
									console.log('🚀 ~ CardsDetail ~ inputValue:', inputValue)

									// Suggest the creation of a new value
									// const isExisting = options.some((option) => inputValue === option.title);
									// if (inputValue !== '' && !isExisting) {
									//   filtered.push({
									//     inputValue,
									//     title: `Add "${inputValue}"`,
									//   });
									// }

									return filtered
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								id='free-solo-with-text-demo'
								options={attributes}
								getOptionLabel={option => {
									// Value selected with enter, right from the input
									if (typeof option === 'string') {
										return option
									}
									// Add "xxx" option created dynamically
									if (option.inputValue) {
										return option.inputValue
									}
									// Regular option

									return option.name
								}}
								renderOption={(props, option) => (
									<li {...props}>{option.name}</li>
								)}
								freeSolo
								renderInput={params => (
									<TextField
										{...params}
										label='Attribute'
										variant='outlined'
										fullWidth
										id='fullWidth'
										onChange={e => {
											handleChange(e)
										}}
									/>
								)}
							/>

							{/* formulario de ataque */}

							<TextField
								type='number'
								name='atk'
								disabled={
									values.type === 'Spell Card' || values.type === 'Trap Card'
								}
								value={values.atk}
								error={values.atk < 0}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='atk'
							></TextField>

							{/* formulario de defensa */}

							<TextField
								type='number'
								name='def'
								disabled={
									values.type === 'Spell Card' || values.type === 'Trap Card'
								}
								required={values.def > 0}
								value={values.def}
								error={values.def < 0}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
							></TextField>

							{/* inputs de fecha */}

							<Typography variant='h6' textAlign={'center'}>
								Creation date
							</Typography>

							{/* primera fecha */}

							<TextField
								type='Date'
								name='firstdate'
								required
								// disabled={
								// 	values.type === 'Spell Card' || values.type === 'Trap Card'
								// }
								// required={values.def > 0}
								value={values.firsdate}
								error={values.firstdate > values.lastdate}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
							></TextField>

							<Typography variant='h6' textAlign={'center'}>
								First appearance in anime
							</Typography>

							{/* ultima fecha */}

							<TextField
								type='Date'
								required
								name='lastdate'
								value={values.lastdate}
								error={values.lastdate < values.firstdate}
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
							></TextField>

							{/* formulario de terminos y condiciones */}

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
										disabled={
											!agreeterm ||
											values.atk < 0 ||
											values.def < 0 ||
											values.level < 1 ||
											values.name.trim().length < 2 ||
											values.desc.trim().length < 2 ||
											values.firstdate.trim().length === 0 ||
											values.lastdate.trim().length === 0 ||
											values.lastdate < values.firstdate ||
											values.firstdate > values.lastdate ||
											values.type.trim().length === 0
										}
										color='secondary'
										sx={buttonSx}
										onClick={handlesubmit}
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
