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
<<<<<<< HEAD:src/components/CardGrid/CardGrid.js
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
=======
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/helpers/CardGrid.js
import VisibilityIcon from '@mui/icons-material/Visibility'

export const CardGrid = () => {
	const { cards = [], isLoading, tarjeta } = useSelector(state => state.cards)

	return (
		<div className='general'>
<<<<<<< HEAD:src/components/CardGrid/CardGrid.js
			{/* circular progress
=======

				{/* circular progress */}
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/helpers/CardGrid.js

			{isLoading ? (
				<Box sx={{ display: 'flex' }} justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				''
<<<<<<< HEAD:src/components/CardGrid/CardGrid.js
			)} */}

			{/* visual part */}

			<ul>
=======
			)}

				{/* visual part */}

			<ul >
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/helpers/CardGrid.js
				<div className='card'>
					{cards.map(cards => (
						<div key={cards.id}>
							<CardMedia
<<<<<<< HEAD:src/components/CardGrid/CardGrid.js
								className='imagegrid'
=======
							className='imagegrid'
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/helpers/CardGrid.js
								component='img'
								alt={cards.name}
								image={cards.card_images[0]?.image_url}
							/>
<<<<<<< HEAD:src/components/CardGrid/CardGrid.js
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
=======
							<CardContent className='content' >
								<Typography gutterBottom variant='h5' component='div'>
									{cards.name}
								</Typography>
								<Typography variant='body2' color='white'>
									{cards.desc.slice(0, 80) } ...
								</Typography>
								<CardActions>
									<Button size='small'>
										<Link to={`/${cards.id}`} className='linkCards' >
											<VisibilityIcon/> <MoreHorizIcon/>
>>>>>>> 760b6654d8c56877f9697261eaa9b5620de1d7c8:src/store/slices/helpers/CardGrid.js
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
