/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Fade, Grow, Slide } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const CardGrid = () => {
	const { cards = [], isLoading, tarjeta } = useSelector(state => state.cards)
	const [checked, setChecked] = React.useState(true)

	return (
		<div className='general'>
			{/* visual part */}

			<ul>
				<Fade
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
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
				</Fade>
			</ul>
			<Outlet />
		</div>
	)
}
