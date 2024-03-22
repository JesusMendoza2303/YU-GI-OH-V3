/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import {
	Alert,
	Box,
	Button,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Fade,
	Snackbar,
	TextField,
	Typography,
} from '@mui/material'

import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	getcardsLocal,
	reinicio,
	getScrollingCardsLocal,
} from '../../store/slices/cards/CardsAccions'
import { Trans, useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const AllCards = () => {
	const dispatch = useDispatch()
	const {
		cards = [],
		isLoading,
		msgError,
		page,
	} = useSelector(state => state.cards)
	const [hasMore, setHasMore] = useState(true)
	const [openSnack, setOpenSnack] = useState(true)
	const [checked, setChecked] = React.useState(true)

	const { t, i18n } = useTranslation()

	const hanldesnackclose = () => {
		setOpenSnack(false)
	}
	const hanldesnackOpen = () => {
		setOpenSnack(true)
	}

	useEffect(() => {
		dispatch(getcardsLocal(page + 1))
		return () => {
			dispatch(reinicio())
		}
	}, [])

	const fetchMoreData = () => {
		setTimeout(() => {
			dispatch(getScrollingCardsLocal(page + 1, cards))
		}, 1000)
	}
	return (
		<div className='general'>
			<Navbar />

			<Typography
				justifyContent={'center'}
				variant='h3'
				component='h3'
				className='principalTitle'
				sx={{
					mr: 2,
					display: { xs: 'none', md: 'flex' },
					fontFamily: 'Namdhinggo',
					fontWeight: 500,
					letterSpacing: '.3rem',
					textDecoration: 'none',
				}}
			>
				<Trans i18nKey='all_cards'>All CARDS</Trans>
			</Typography>

			<div>
				{/* circular progress */}

				{isLoading ? (
					<Box sx={{ display: 'flex' }} justifyContent='center'>
						<CircularProgress />
					</Box>
				) : (
					// <CardGridSearch/>
					<div>
						<InfiniteScroll
							dataLength={cards.length} // This is important field to render the next data
							next={fetchMoreData}
							hasMore={hasMore}
							loader={
								<Box>
									<Snackbar
										open={openSnack}
										autoHideDuration={3000}
										onClose={hanldesnackclose}
									>
										<Alert severity='success' onClose={hanldesnackclose}>
											<Trans i18nKey='Loading'>Loading...</Trans>
										</Alert>
									</Snackbar>
								</Box>
							}
						>
							<Fade
								in={checked}
								style={{ transformOrigin: '0 0 0' }}
								{...(checked ? { timeout: 1000 } : {})}
							>
								<div className='general'>
									<ul>
										<div className='card'>
											{cards.map(cards => (
												<div key={cards.id}>
													<CardMedia
														className='imagegrid'
														component='img'
														alt={cards.name}
														image={cards.card_images[0]?.image_url}
													/>
													<CardContent className='content'>
														<Typography
															gutterBottom
															variant='h5'
															component='div'
															sx={{
																fontFamily: 'Bebas Neue',
															}}
														>
															{cards.name}
														</Typography>
														<Typography
															variant='h7'
															sx={{
																fontFamily: 'Dosis',
															}}
														>
															{cards.desc.slice(0, 80)} ...
														</Typography>
														<CardActions>
															<Button size='small'>
																<Link to={`/${cards.id}`} className='linkCards'>
																	<VisibilityIcon /> <MoreHorizIcon />
																</Link>
															</Button>
														</CardActions>
													</CardContent>
												</div>
											))}
										</div>
									</ul>
									<Outlet />
								</div>
							</Fade>
						</InfiniteScroll>
					</div>
				)}
			</div>
		</div>
	)
}
