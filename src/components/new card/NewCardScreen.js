/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useMemo, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { getcardsLocal, reinicio } from '../../store/slices/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
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
} from '@mui/material'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import { green } from '@mui/material/colors'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import AddReactionIcon from '@mui/icons-material/AddReaction'

export const NewCardScreen = () => {
	const [loading, setLoading] = React.useState(false)
	const [success, setSuccess] = React.useState(false)
	const timer = React.useRef()

	const buttonSx = {
		...(success && {
			bgcolor: green[500],
			'&:hover': {
				bgcolor: green[700],
			},
		}),
	}

	const [rowId, setRowId] = useState(null)
	console.log('🚀 ~ NewCardScreen ~ rowId:', rowId)

	React.useEffect(() => {
		return () => {
			clearTimeout(timer.current)
		}
	}, [])

	const dispatch = useDispatch()
	const { cards = [], isLoading } = useSelector(state => state.cards)
	console.log('🚀 ~ NewCardScreen ~ cards:', cards)

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
		level: 0,
		race: '',
		type: '',
	})

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
		dispatch(getcardsLocal())
		return () => {
			dispatch(reinicio())
			console.log('esta paja se reinicio en teoria')
		}
	}, [])

	const addCard = () => {
		setedit(false)
		settitle('Create a card')
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

		const naipe = { id, name, desc, atk, def, level, race, type }

		naipe.card_images = imagesArray

		axios
			.post('http://localhost:3030/data', naipe)

			.then(res => {
				dispatch(getcardsLocal())
				{
					;<Box>
						<Snackbar open={true} autoHideDuration={1000}>
							<Alert severity='success'>Card created succesfully.</Alert>
						</Snackbar>
					</Box>
				}
				console.log('esta es la carta que se acaba de crear:', naipe)
				closepopup()
			})
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
				field: 'actions',
				headerName: ' ',
				sortable: false,
				width: 160,
				cellClassName: 'actions',
				renderCell: params => (
					<Box>
						<Button
							id='demo-positioned-button'
							aria-haspopup='true'
							// onClick={handleViewClick}
							startIcon={<VisibilityIcon />}
						>
							<Link to={`/${params.row.id}`} className='viewcard'>
								view...
							</Link>
							<Outlet />
						</Button>
					</Box>
				),

				filterable: false,
			},
		],
		[],
	)

	const clearstate = () => {
		setCard_images('')
		setValues(preValues => ({
			...preValues,
			name: '',
			desc: '',
			atk: 0,
			def: 0,
			level: 0,
			race: '',
			type: '',
		}))
	}

	return (
		<div>
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

			<Paper sx={{ margin: '1%' }}>
				<div style={{ margin: '1%' }}>
					<Button
						onClick={addCard}
						startIcon={<AddCircleIcon />}
						variant='cotained'
					>
						Create a Card
					</Button>
				</div>
				<DataGrid
					columns={columns}
					rows={cards}
					getRowId={row => {
						return row.id
					}}
					onCellEditCommit={params => setRowId(params.row.id)}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
					pageSizeOptions={[5, 10, 50, 100]}
					disableRowSelectionOnClick
				/>
			</Paper>

			<Dialog open={open} onClose={closepopup} fullWidth maxWidth='sm'>
				<DialogTitle>
					{<AddReactionIcon />}
					<span>{title}</span>
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
											values.def < 0 ||
											values.level < 0 ||
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
		</div>
	)
}
