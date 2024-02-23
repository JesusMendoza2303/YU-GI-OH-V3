/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsLocalByid, reinicio } from '../store/slices/thunks'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import '@fontsource/roboto/500.css'
import {
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
} from '@mui/material'
import { green } from '@mui/material/colors'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import axios from 'axios'

export const CardsDetail = () => {
	const dispatch = useDispatch()
	const { cardsid } = useParams()
	const { cards } = useSelector(state => state.cards)

	const [id] = useState(0)
	const [open, openchange] = useState(false)
	const [agreeterm] = useState(true)
	const [card_images, setCard_images] = useState(
		cards?.[0]?.card_images[0]?.image_url,
	)
	const [edit, setedit] = useState(false)
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()

	const [values, setValues] = useState({
		name: '',
		desc: '',
		atk: '',
		def: '',
		level: '',
		race: '',
		type: '',
	})

	console.log('esta es cards:', cards)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getcardsLocalByid(cardsid, navigate))
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria')
		}
	}, [])

	const handlesubmit = e => {
		e.preventDefault()
		if (!loading) {
			setSuccess(false)
			setLoading(true)
			timer.current = window.setTimeout(() => {
				setSuccess(true)
				setLoading(false)
			}, 2000)
		}
		const { name, desc, atk, def, level, race, type } = values
		const imagesArray = []
		imagesArray.push({
			image_url: card_images,
		})

		const naipe = { name, desc, atk, def, level, race, type }

		naipe.card_images = imagesArray

		axios
			.put(`http://localhost:3030/data/${cardsid}`, naipe)

			.then(res => {
				dispatch(getcardsLocalByid(cardsid))
				closepopup()
				console.log('esta es la carta que se acaba de editar:', cards)
			})
	}

	const handleDeleteClick = () => {
		axios
			.delete(`http://localhost:3030/data/${cardsid}`)

			.then(res => {
				navigate('/')
				console.log('esta es la carta que se acaba de eliminar:', cardsid)
				dispatch(reinicio())
			})
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

	return (
		<>
			<Navbar />
			<Card sx={{ display: 'flex' }} className='cardDetail'>
				<Box
					sx={{ display: 'flex', flexDirection: 'column' }}
					className='cardDetail'
				>
					{console.log('🚀 ~ CardsDetail ~ values:', values)}
					<CardContent sx={{ flex: '1 0 auto' }}>
						<div>
							<Typography component='div' variant='h3'>
								{cards[0]?.name}
							</Typography>
							<br />
							<Typography variant='h5' color='white' component='div'>
								{cards[0]?.desc}
							</Typography>

							<Typography variant='h6' color='white'>
								<p className='parrafo'>ID: {cards[0]?.id}</p>
								<p className='parrafo'>Type: {cards[0]?.type}</p>
								<p className='parrafo'>
									{!cards[0]?.race
										? 'this card dont have race'
										: `race: ${cards[0]?.race}`}
								</p>
								<p className='parrafo'>
									{!cards[0]?.level
										? 'this card dont have level'
										: `level: ${cards[0]?.level}`}
								</p>
								<p className='parrafo'>
									{!cards[0]?.atk ? undefined : `atk: ${cards[0]?.atk} `}
								</p>
								<p className='parrafo'>
									{!cards[0]?.def ? undefined : `def: ${cards[0]?.def}`}
								</p>
							</Typography>
							<Stack spacing={2} direction='row' justifyContent='center'>
								<Button
									variant='contained'
									startIcon={<EditIcon />}
									onClick={addCard}
								>
									Edit Card
								</Button>

								<Button
									variant='contained'
									color='error'
									startIcon={<DeleteIcon />}
									onClick={handleDeleteClick}
								>
									Delete Card
								</Button>
							</Stack>
						</div>
					</CardContent>
				</Box>
				<div className='cardDetail'>
					<CardMedia
						component='img'
						sx={{ width: 350 }}
						image={cards[0]?.card_images[0]?.image_url}
						alt={cards[0]?.name}
					/>
				</div>
			</Card>

			<Dialog open={open} onClose={closepopup} fullWidth maxWidth='sm'>
				<DialogTitle>
					{<EditIcon />} <span>Edit this Card</span>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handlesubmit}>
						<Stack spacing={2} margin={2}>
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
							<TextField
								required
								type='number'
								error={values.level < 0}
								value={values.level}
								name='level'
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='level'
							></TextField>
							<TextField
								required
								value={values.race}
								name='race'
								onChange={e => {
									handleChange(e)
								}}
								variant='outlined'
								label='race'
							></TextField>
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
											values.level < 0 ||
											values.def < 0 ||
											values.name.trim().length < 2 ||
											values.desc.trim().length < 2 ||
											loading ||
											values.type.trim().length === 0
										}
										color='primary'
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
								<Box sx={{ m: 1, position: 'relative' }}>
									<Button
										disabled={
											!agreeterm ||
											values.atk < 0 ||
											values.def < 0 ||
											values.level < 0 ||
											values.name.trim().length < 2 ||
											values.desc.trim().length < 2 ||
											loading ||
											values.type.trim().length === 0
										}
										variant='contained'
										type='submit'
										sx={buttonSx}
									>
										Submit
									</Button>

									{loading && (
										<CircularProgress
											size={24}
											sx={{
												color: green[500],
												position: 'absolute',
												top: '50%',
												left: '50%',
												marginTop: '-12px',
												marginLeft: '-12px',
											}}
										/>
									)}
								</Box>
							</Box>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
