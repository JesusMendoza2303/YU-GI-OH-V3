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
	Autocomplete,
	createFilterOptions,
	DialogActions,
	Grow,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { getRaces } from '../../store/slices/races/RacesAccions'
import { getAttributes } from '../../store/slices/attributes/AttributesAccions'
import { useTranslation, Trans, i18n } from 'react-i18next'
import { NewCardAccions } from './NewCardAccions/NewCardAccions'
import allHandles from './handles/handle'
import Draggable from 'react-draggable'
import { FormularioBase } from '../CardGrid/FormularioBase'
import { FormularioTerminosCondiciones } from '../CardGrid/FormularioTerminosCondiciones'

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

	const openPopupButton = () => {
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
				width: 80,
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
				// aria-labelledby='draggable-dialog-title'
				// PaperComponent={PaperComponent}
			>
				<DialogTitle
				//  style={{ cursor: 'move' }} id='draggable-dialog-title'
				>
					{<AddReactionIcon />}
					<span>
						<Trans i18nKey='crearFormCarta'>Create a new card!</Trans>
					</span>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handlesubmit}>
						<Stack spacing={2} margin={2}>
							{/* aqui esta los formularios desde nombre hasta defensa */}

							<FormularioBase
								data={{
									values,
									handleChange,
									setCard_images,
									card_images,
									handleChangeSelection,
									filter,
									races,
									attributes,
								}}
							/>

							{/* inputs de fecha */}

							<Typography variant='h6' textAlign={'center'}>
								<Trans i18nKey='dateForm1'>Creation date</Trans>
							</Typography>

							{/* primera fecha */}

							<TextField
								type='Date'
								name='firstdate'
								required
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

							<FormularioTerminosCondiciones
								dataTerms={{ agreeterm, agreetermchange }}
							/>
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
