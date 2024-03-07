/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import {
	Autocomplete,
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	createFilterOptions,
} from '@mui/material'
import { green } from '@mui/material/colors'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { attributes } from './data/Attributes'

import axios from 'axios'
import {
	editCard,
	getcardsLocalByid,
	reinicio,
	remove,
} from '../store/slices/thunks'
import { getRaces } from '../store/slices/RacesThunks'
import { getAttributes } from '../store/slices/AttributesThunk'

const filter = createFilterOptions()

export const CardsDetail = () => {
	const [value, setValue] = useState('')
	const { races = [] } = useSelector(state => state.races)
	const { attributes = [] } = useSelector(state => state.attributes)
	console.log('🚀 ~ RaceScreen ~ races:', races)

	const dispatch = useDispatch()
	const { cardsid } = useParams()
	const { cards } = useSelector(state => state.cards)
	console.log('🚀 ~ CardsDetail ~ cards:', cards)

	const [id] = useState(0)
	const [open, openchange] = useState(false)
	const [agreeterm] = useState(true)
	const [card_images, setCard_images] = useState('')
	//	const [race, setRace] = useState('')
	const [edit, setedit] = useState(false)
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()

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

	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`http://localhost:3030/data?id=${cardsid}`)
			.then(response => {
				if (!response.data.length) {
					navigate('/')
				}

				const cardsdetaild = response.data[0]

				setCard_images(cardsdetaild.card_images[0]?.image_url)

				setValues(preValues => ({
					...preValues,
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

		const { name, desc, atk, def, level, type, race } = values
		const imagesArray = []
		imagesArray.push({
			image_url: card_images,
		})

		const naipe = { name, desc, atk, def, level, type, race }

		naipe.card_images = imagesArray

		dispatch(editCard(cardsid, naipe)).then(res => {
			console.log('🚀 ~ dispatch ~ naipe:', naipe)
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
		e.preventDefault()
		const { value, name } = e.target
		console.log('🚀 ~ handleChange ~ e.target:', e.target)
		setValues(preValues => ({
			...preValues,
			[name]: value,
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

	useEffect(() => {
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	return (
		<div>
			<Navbar />

			{/* parte visual */}

			<Box sx={{ display: 'flex' }} className='cardDetail'>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					{console.log('🚀 ~ CardsDetail ~ values:', values)}
					<CardContent sx={{ flex: '1 0 auto' }}>
						<div>
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
							<br />
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
								<p className='parrafo'>Type: {values.type}</p>
								<p className='parrafo'>
									{!values.race
										? 'this card dont have race'
										: `race: ${values.race}`}
								</p>
								<p className='parrafo'>
									{!values.level
										? 'this card dont have level'
										: `level: ${values.level}`}
								</p>
								<p className='parrafo'>
									{!values.atk ? undefined : `atk: ${values.atk} `}
								</p>
								<p className='parrafo'>
									{!values.def ? undefined : `def: ${values.def}`}
								</p>
								{/* <p className='parrafo'>
									{!values.attribute ? undefined : `attribute: ${values.attribute}`}
								</p> */}
							</Typography>

							{/* botones */}

							<Stack spacing={2} direction='row' justifyContent='center'>
								<Button
									variant='contained'
									startIcon={<EditIcon />}
									style={{ backgroundColor: '#9E5AFF' }}
									onClick={addCard}
								>
									Edit Card
								</Button>

								<Button
									variant='contained'
									startIcon={<DeleteIcon />}
									style={{ backgroundColor: '#D92579' }}
									onClick={handleDeleteClick}
								>
									Delete Card
								</Button>
							</Stack>
						</div>
					</CardContent>
				</Box>
				{/* imagen */}
				<div>
					<CardMedia
						className='imagenCardDetail'
						component='img'
						sx={{ width: 350 }}
						image={card_images}
						alt={values.name}
					/>
				</div>
			</Box>

			{/* formulario de edicion */}

			<Dialog open={open} onClose={closepopup} fullWidth maxWidth='sm'>
				<DialogTitle>
					{<EditIcon />} <span>Edit this Card</span>
					<Button
						color='secondary'
						// ariant='contained'
						style={{ left: 330 }}
						onClick={closepopup}
					>
						<CloseIcon />
					</Button>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handlesubmit}>
						<Stack spacing={2} margin={2}>
							{/* formulario de name */}

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
								/>
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
									console.log('🚀 ~ RaceScreen ~ value:', value)
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
									console.log('🚀 ~ RaceScreen ~ value:', value)
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
							/>

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
								label='def'
							></TextField>

							{/* formulario de terminos y condiciones */}

							<FormControlLabel
								checked={agreeterm}
								onChange={e => {
									handleChange(e)
								}}
								control={<Checkbox></Checkbox>}
								label='Agree Terms & Conditions'
							></FormControlLabel>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Box sx={{ m: 1, position: 'relative' }}>
									<Fab
										aria-label='save'
										type='submit'
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
