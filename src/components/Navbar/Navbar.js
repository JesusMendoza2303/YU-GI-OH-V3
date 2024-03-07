/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import HomeIcon from '@mui/icons-material/Home'
import { useTranslation, Trans, i18n } from 'react-i18next'

import { Image } from '@mui/icons-material'
export const Navbar = () => {
	return (
		<AppBar position='static' style={{ backgroundColor: '#1D1D1D' }}>
			<Container>
				<Toolbar>
					<HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<MenuItem>
						<Typography
							textAlign='center'
							variant='h5'
							noWrap
							component='a'
							sx={{
								mr: 2,
								fontFamily: 'Bebas Neue',
								fontWeight: 500,
								letterSpacing: '.3rem',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to='/'>
								YU GI OH!
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/monsters_cards'}>
								MONSTER CARDS
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/trap_cards'}>
								TRAP CARDS
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/spell_cards'}>
								SPELL CARDS
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/race'}>
								RACES
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/attributes'}>
								ATTRIBUTES
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Bebas Neue',
								fontWeight: 300,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/new_card'}>
								CREATE NEW CARDS
							</Link>
						</Typography>
					</MenuItem>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
