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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const CardGridTarjeta = () => {
	const { tarjeta = [], isLoading } = useSelector(state => state.cards)

	return (
		<div className='general'>
			{/* circular progress */}

			{isLoading ? (
				<Box sx={{ display: 'flex' }} justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				''
			)}

			{/* visual part */}

			<ul>
				<div className='card'>
					{tarjeta.map(tarjeta => (
						<div key={tarjeta.id}>
							<CardMedia
								className='imagegrid'
								component='img'
								alt={tarjeta.name}
								image={tarjeta.card_images[0]?.image_url}
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
									{tarjeta.name}
								</Typography>
								<Typography
									variant='h7'
									sx={{
										fontFamily: 'Dosis',
										width: 150,
									}}
								>
									{tarjeta.desc.slice(0, 80)} ...
								</Typography>
								<CardActions>
									<Button size='small'>
										<Link to={`/${tarjeta.id}`} className='linkCards'>
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
