/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { Alert, Box, Snackbar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
	getScrollingCardsLocal,
	getcardsByNameLocal2,
	getcardsLocal,
	reinicio,
} from '../../store/slices/cards/CardsAccions'
import { Trans } from 'react-i18next'

export const CardGridSearch = () => {
	const {
		cards = [],
		isLoading,
		tarjeta,
		page,
	} = useSelector(state => state.cards)
	const [hasMore, setHasMore] = useState(true)
	const dispatch = useDispatch()
	const [offset, setOffset] = useState(0)
	const [openSnack, setOpenSnack] = useState(true)

	useEffect(() => {
		dispatch(getcardsLocal(page + 1))
		return () => {
			dispatch(reinicio())
		}
	}, [])

	const fetchMoreData = () => {
		setTimeout(() => {
			dispatch(getScrollingCardsLocal(page + 1, cards))
			return () => {
				dispatch(reinicio())
			}
		}, 1000)
	}

	const hanldesnackclose = () => {
		setOpenSnack(false)
	}
	const hanldesnackOpen = () => {
		setOpenSnack(true)
	}

	return (
		<div className='general'>
			{/* visual part */}

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
			</InfiniteScroll>
			<Outlet />
		</div>
	)
}
