/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import {
	createCard,
	getcardsGrid,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
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
	DialogActions,
	Grow,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@mui/material/colors'
import {
	DataGrid,
	GridToolbar,
	GridRowModes,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from '@mui/x-data-grid'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { getRaces } from '../../store/slices/races/RacesAccions'
import { getAttributes } from '../../store/slices/attributes/AttributesAccions'
import { useTranslation, Trans, i18n } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { NewCardAccions } from './NewCardAccions/NewCardAccions'
import allHandles from './handles/handle'
import Draggable from 'react-draggable'

const filter = createFilterOptions()

export const NewCardScreen = () => {
	const { t, i18n } = useTranslation()
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()
	const { races = [] } = useSelector(state => state.races)
	const { attributes = [] } = useSelector(state => state.attributes)
	// row ID:
	const [rowId, setRowId] = useState(0)
	//
	const dispatch = useDispatch()
	const { cards = [], isLoading } = useSelector(state => state.cards)

	const [id] = useState(0)
	const [open, openchange] = useState(false)
	const [agreeterm, agreetermchange] = useState(false)
	const [card_images, setCard_images] = useState('')
	const [openSnack, setOpenSnack] = useState(true)
	const [checked, setChecked] = useState(true)
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

	// llamada de la informacion de las razas

	useEffect(() => {
		dispatch(getRaces())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// llamada de la informacion de los atributos

	useEffect(() => {
		dispatch(getAttributes())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// llamada de la informacion de las cartas

	useEffect(() => {
		dispatch(getcardsGrid())
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// manejar el cambio de los values

	const handleChange = e => {
		e.preventDefault()
		const { value, name } = e.target

		setValues(preValues => ({
			...preValues,
			[name]: value,
		}))
	}

	const handleChangeSelection = (field, value) => {
		const { name } = value
		setValues(preValues => ({
			...preValues,
			[field]: name,
		}))
	}

	// apertura y cierre del formulario

	const closepopup = () => {
		openchange(false)
	}

	const openpopup = () => {
		openchange(true)
		clearstate()
	}

	const hanldesnackclose = () => {
		setOpenSnack(false)
	}

	const columns = useMemo(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				width: 90,
			},
			{
				field: 'card_images',
				headerName: 'image',
				width: 90,
				renderCell: ({ row }) => <Avatar src={row.card_images[0]?.image_url} />,

				sortable: false,
				filterable: false,
			},
			{
				field: 'name',
				headerName: 'name',
				width: 200,
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
				width: 400,
				editable: true,
			},
			{
				field: 'level',
				headerName: 'level',
				type: 'number',
				width: 50,
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
				type: 'actions',
				headerName: 'Actions',
				width: 300,
				cellClassName: 'actions',
				renderCell: params => <NewCardAccions data={{ params, rowId }} />,

				filterable: false,
			},
		],
		[rowId],
	)

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

	// ejemplo handles

	const { handleConsoleCustom, handleConsole, clearstate } = allHandles(
		values,
		setValues,
		setCard_images,
		loading,
		setSuccess,
		setLoading,
		timer,
		card_images,
		id,
		createCard,
		dispatch,
		getcardsGrid,
		closepopup,
	)

	useEffect(() => {
		clearstate()
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	//  useEffect(() => {
	//  	handlesubmit ()
	//  	return () => {
	//  		clearTimeout(timer.current)
	//  	}
	//  }, [])

	const handlesubmit = e => {
		console.log('se ha enviado')
		//	 boton de carga
		e?.preventDefault()
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
			dispatch(getcardsGrid())

			closepopup()
		})
	}

	return (
		<div>
			{/* validar si esta cargando o no */}
			<Navbar />

			{isLoading ? (
				''
			) : (
				<Box>
					<Snackbar
						open={openSnack}
						autoHideDuration={2000}
						onClose={hanldesnackclose}
					>
						<Alert severity='success' onClose={hanldesnackclose}>
							<Trans i18nKey='cartasCargadas'>Cards Loaded Succesfully</Trans>
						</Alert>
					</Snackbar>
				</Box>
			)}

			{/* boton de creacion */}

			<Box sx={{ margin: '1%', backgroundColor: 'white' }}>
				<div style={{ margin: '1%' }}>
					<Grow
						in={checked}
						style={{ transformOrigin: '0 0 0' }}
						{...(checked ? { timeout: 1000 } : {})}
					>
						<Button
							className='createboton'
							onClick={openpopup}
							startIcon={<AddCircleIcon />}
							variant='cotained'
						>
							<Typography
								sx={{
									fontFamily: 'Nunito Sans',
									fontWeight: 600,
								}}
							>
								<Trans i18nKey='crearCarta'>Create a Card</Trans>
							</Typography>
						</Button>
					</Grow>
				</div>

				{/* Data grid */}

				<DataGrid
					columns={columns}
					className='datagrid'
					rows={cards}
					getRowId={row => {
						return row.id
					}}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10,
							},
						},
					}}
					slots={{ toolbar: GridToolbar }}
					onCellEditStart={params => {
						setRowId(params.id)
					}}
					// onCellEditStop={params => setRowId(params.id)}
				/>
			</Box>

			{/* formulario */}

			<Dialog
				open={open}
				onClose={closepopup}
				fullWidth
				maxWidth='sm'
				aria-labelledby='draggable-dialog-title'
				PaperComponent={PaperComponent}
			>
				<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
					{<AddReactionIcon />}
					<span>
						<Trans i18nKey='crearFormCarta'>Create a new card!</Trans>
					</span>
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
									<Trans i18nKey='TypeForm'>What type of card is it?</Trans>
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
								onChange={(e, value) => {
									console.log('🚀 ~ CardsByID ~ value:', value)
									handleChangeSelection('race', value)
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params)

									const { inputValue } = params
									console.log('🚀 ~ CardsDetail ~ inputValue:', inputValue)

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
								onChange={(e, value) => {
									handleChangeSelection('attribute', value)
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params)

									const { inputValue } = params
									console.log('🚀 ~ CardsDetail ~ inputValue:', inputValue)

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
								<Trans i18nKey='dateForm1'>Creation date</Trans>
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
								<Trans i18nKey='dateForm2'>First appearance in anime</Trans>
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

							{/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
							</Box> */}
						</Stack>
					</form>
				</DialogContent>

				{/* nuevos botones de guardado y cierre */}

				<DialogActions>
					<Button
						onClick={handlesubmit}
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
						type='submit'
						aria-label='save'
					>
						Submit
					</Button>
					<Button onClick={closepopup}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
