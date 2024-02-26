/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import HomeIcon from '@mui/icons-material/Home'
import '@fontsource/roboto/700.css'
import { Image } from '@mui/icons-material'
export const Navbar = () => {
	return (
		
			<AppBar position='static'  style={{backgroundColor: '#5A2CA3'}}>
				<Container>
					<Toolbar>
						<HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<MenuItem>
							<Typography
								textAlign='center'
								variant='h6'
								noWrap
								component='a'
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								<Link className='linkNavbar' to='/'>
									Yugioh
								</Link>
							</Typography>
						</MenuItem>

						<MenuItem>
							<Typography textAlign='center' className=' bottonMenu'>
								<Link className='linkNavbar' to={'/monsters_cards'}>
									Monsters Cards
								</Link>
							</Typography>
						</MenuItem>

						<MenuItem>
							<Typography textAlign='center' className=' bottonMenu'>
								<Link className='linkNavbar' to={'/trap_cards'}>
									Trap Cards
								</Link>
							</Typography>
						</MenuItem>

						<MenuItem>
							<Typography textAlign='center' className=' bottonMenu'>
								<Link className='linkNavbar' to={'/spell_cards'}>
									Spells Cards
								</Link>
							</Typography>
						</MenuItem>

						<MenuItem>
							<Typography textAlign='center' className=' bottonMenu'>
								<Link className='linkNavbar' to={'/new_card'}>
									Create New Cards
								</Link>
							</Typography>
						</MenuItem>
					</Toolbar>
				</Container>
			</AppBar>
		
	)
}
