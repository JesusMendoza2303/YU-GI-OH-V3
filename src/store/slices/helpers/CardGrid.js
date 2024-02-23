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
import { Box } from '@mui/material'

export const CardGrid = () => {
	const { cards = [], isLoading } = useSelector(state => state.cards)

	return (
		<div className='general'>
			{isLoading ? (
				<Box sx={{ display: 'flex' }} justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				''
			)}
			<ul className='general'>
				<div className='card'>
					{cards.map(cards => (
						<div key={cards.id}>
							<CardMedia
								component='img'
								alt={cards.name}
								image={cards.card_images[0]?.image_url}
							/>
							<CardContent className='content'>
								<Typography gutterBottom variant='h5' component='div'>
									{cards.name}
								</Typography>
								<Typography variant='body2' color='white'>
									{cards.desc}
								</Typography>
								<CardActions>
									<Button size='small'>
										<Link to={`/${cards.id}`} className='linkCards'>
											More...
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
