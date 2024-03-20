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
import { Box } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getcardsByNameLocal2 } from '../../store/slices/cards/CardsAccions'

export const CardGridSearch = () => {
	const {
		cards = [],
		isLoading,
		tarjeta,
		page,
	} = useSelector(state => state.cards)
	const dispatch = useDispatch()
	const [search, setsearch] = useState('')
	const [verMas, setVerMas] = useState(true)
	const [offset, setOffset] = useState(0)

	const nextCards = () => {
		dispatch(getcardsByNameLocal2(search, page + 1))
	}
	useEffect(() => {
		const handleScroll = e => {
			const scrollHeight = e.target.documentElement.scrollHeight
			const currentHeight =
				e.target.documentElement.scrollTop + window.innerHeight
			if (currentHeight + 1 >= scrollHeight) {
				setOffset(offset + 18)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll')
	}, [offset])

	return (
		<div className='general'>
			{/* visual part */}

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
	)
}
