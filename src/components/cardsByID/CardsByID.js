/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fade,
	FormControlLabel,
	Grow,
	Paper,
	Stack,
	createFilterOptions,
} from '@mui/material'
import { green } from '@mui/material/colors'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import {
	editCard,
	getcardsLocalByid,
	reinicio,
	remove,
} from '../../store/slices/cards/CardsAccions'
import { getRaces } from '../../store/slices/races/RacesAccions'
import { getAttributes } from '../../store/slices/attributes/AttributesAccions'
import { useTranslation, Trans, i18n } from 'react-i18next'
import Draggable from 'react-draggable'
import allHandles from './handles/handles'
import { FormularioBase } from '../helpers/FormularioBase'
import { FormularioTerminosCondiciones } from '../helpers/FormularioTerminosCondiciones'

const filter = createFilterOptions()

export const CardsByID = () => {
	// use states

	const { t, i18n } = useTranslation()
	const [value, setValue] = useState('')
	const { races = [] } = useSelector(state => state.races)
	const { attributes = [] } = useSelector(state => state.attributes)

	const dispatch = useDispatch()
	const { cardsid } = useParams()
	const { cards } = useSelector(state => state.cards)

	const [id] = useState(0)
	const [open, openchange] = useState(false)
	const [agreeterm, agreetermchange] = useState(false)
	const [card_images, setCard_images] = useState('')
	//	const [race, setRace] = useState('')
	const [edit, setedit] = useState(false)
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()
	const [check, setCheck] = useState(true)

	const navigate = useNavigate()

	const [cardsForm, setCardsForm] = useState({
		name: '',
		desc: '',
		atk: 0,
		def: 0,
		level: 1,
		race: '',
		attribute: '',
		type: '',
	})

	const [values, setValues] = useState({
		name: '',
		desc: '',
		atk: 0,
		def: 0,
		level: 1,
		race: '',
		attribute: '',
		type: '',
	})

	// llamadas de informacion

	useEffect(() => {
		dispatch(getRaces())
		dispatch(getAttributes())
		axios
			.get(`http://localhost:3030/data?id=${cardsid}`)
			.then(response => {
				if (!response.data.length) {
					navigate('/error')
				}

				const cardsdetaild = response.data[0]

				setCard_images(cardsdetaild.card_images[0]?.image_url)

				setValues(setCardsForm => ({
					...setCardsForm,
					name: cardsdetaild.name,
					desc: cardsdetaild.desc,
					atk: cardsdetaild.atk,
					def: cardsdetaild.def,
					level: cardsdetaild.level,
					race: cardsdetaild.race,
					attribute: cardsdetaild.attribute,
					type: cardsdetaild.type,
				}))
			})

			.catch(error => console.error(error))
		return () => {
			dispatch(reinicio())
		}
	}, [])

	// handles

	const handlesubmit = e => {
		// parte visual del boton
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

		const { name, desc, atk, def, level, type, race, attribute } = values
		const imagesArray = []
		imagesArray.push({
			image_url: card_images,
		})

		const naipe = { name, desc, atk, def, level, type, race, attribute }

		naipe.card_images = imagesArray

		dispatch(editCard(cardsid, naipe)).then(res => {
			dispatch(getcardsLocalByid(cardsid))
			closepopup()
		})
	}

	const handleDeleteClick = () => {
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove(cardsid)).then(res => {
				navigate('/')
				dispatch(reinicio())
			})
		}
	}

	const addCard = () => {
		setedit(false)
		openpopup()
	}

	const handleChange = e => {
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

	const closepopup = () => {
		openchange(false)
	}
	const openpopup = () => {
		openchange(true)
	}

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	}

	function PaperComponent(props) {
		return (
			<Draggable
				handle='#draggable-dialog-title'
				cancel={'[class*="MuiDialogContent-root"]'}
				enableUserSelectHack={false}
			>
				<Paper {...props} />
			</Draggable>
		)
	}

	// handles

	const { ejemplo } = allHandles()

	useEffect(() => {
		ejemplo()
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	return (
		<div>
			<Navbar />
			<Box sx={{ display: 'flex' }} className='cardDetail'>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ flex: '1 0 auto' }}>
						<div>
							{/* nombre */}

							<Fade
								in={check}
								style={{ transformOrigin: '0 0 0' }}
								{...(check ? { timeout: 1000 } : {})}
							>
								<Typography
									component='div'
									variant='h3'
									sx={{
										fontFamily: 'Bebas Neue',
										fontWeight: 500,
										letterSpacing: '.3rem',
										color: 'black',
									}}
								>
									{values.name}
								</Typography>
							</Fade>

							<br />

							{/* descripcion */}

							<Fade
								in={check}
								style={{ transformOrigin: '0 0 0' }}
								{...(check ? { timeout: 1500 } : {})}
							>
								<Typography
									variant='h4'
									color='black'
									component='div'
									sx={{
										fontFamily: 'Dosis',
										fontWeight: 500,
									}}
								>
									{values.desc}
								</Typography>
							</Fade>

							{/* variables */}

							<Fade
								in={check}
								style={{ transformOrigin: '0 0 0' }}
								{...(check ? { timeout: 2000 } : {})}
							>
								<Typography
									variant='h4'
									color='black'
									sx={{
										fontFamily: 'Dosis',
										fontWeight: 500,
										letterSpacing: '.3rem',
									}}
								>
									<p className='parrafo'>ID: {cardsid}</p>
									<p className='parrafo'>
										Type:
										{values.type}
									</p>

									{/* atk */}

									<p className='parrafo'>
										{!values.atk ? (
											<Trans i18nKey='atkmessage'>
												this card dont have atk
											</Trans>
										) : (
											`atk: ${values.atk} `
										)}
									</p>

									{/* def */}

									<p className='parrafo'>
										{!values.def ? (
											<Trans i18nKey='defmessage'>
												this card dont have def
											</Trans>
										) : (
											`def: ${values.def}`
										)}
									</p>

									{/* raza */}

									<p className='parrafo'>
										{!values.race ? (
											<Trans i18nKey='racemessage'>
												this card dont have race
											</Trans>
										) : (
											`race: ${values.race}`
										)}
									</p>

									{/* nivel */}

									<p className='parrafo'>
										{!values.level ? (
											<Trans i18nKey='levelmessage'>
												this card dont have level
											</Trans>
										) : (
											`level: ${values.level}`
										)}
									</p>

									{/* attribute */}

									<p className='parrafo'>
										{!values.attribute ? (
											<Trans i18nKey='attributemessage'>
												this card dont have attribute
											</Trans>
										) : (
											`attribute: ${values.attribute}`
										)}
									</p>
								</Typography>
							</Fade>
						</div>
					</CardContent>
				</Box>
				{/* imagen */}
				<div>
					<Grow
						in={check}
						style={{ transformOrigin: '0 0 0' }}
						{...(check ? { timeout: 1000 } : {})}
					>
						<CardMedia
							className='imagenCardDetail'
							component='img'
							sx={{ width: 350 }}
							image={card_images}
							alt={values.name}
						/>
					</Grow>
				</div>
			</Box>

			{/* botones */}

			<Stack spacing={2} direction='row' justifyContent='center'>
				<Button
					variant='contained'
					startIcon={<EditIcon />}
					style={{ backgroundColor: '#9E5AFF' }}
					onClick={addCard}
				>
					<Trans i18nKey='editButton'>Edit Card</Trans>
				</Button>

				<Button
					variant='contained'
					startIcon={<DeleteIcon />}
					style={{ backgroundColor: '#D92579' }}
					onClick={handleDeleteClick}
				>
					<Trans i18nKey='deleteButton'>Delete Card</Trans>
				</Button>
			</Stack>

			{/* formulario de edicion */}

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
					{<EditIcon />}
					<span>
						<Trans i18nKey='editForm'>Edit this Card </Trans>
					</span>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handlesubmit}>
						<Stack spacing={2} margin={2}>
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

							{/* formulario de terminos y condiciones */}

							<FormularioTerminosCondiciones
								dataTerms={{ agreeterm, agreetermchange }}
							/>

							{/* nuevos botones de guardado y cierre */}

							<DialogActions>
								<Button
									onClick={handlesubmit}
									size='large'
									disabled={
										!agreeterm ||
										values.atk < 0 ||
										values.level < 1 ||
										values.def < 0 ||
										values.name.trim().length < 2 ||
										values.desc.trim().length < 2 ||
										values.race?.trim().length < 2 ||
										values.attribute?.trim().length < 2 ||
										loading ||
										values.type.trim().length === 0
									}
									color='secondary'
									type='submit'
									aria-label='save'
									sx={buttonSx}
								>
									Submit
								</Button>
								<Button onClick={closepopup}>Cancel</Button>
							</DialogActions>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
