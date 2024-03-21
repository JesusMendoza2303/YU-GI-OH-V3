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
import { Avatar, Box, Button, Menu, Stack } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import TranslateIcon from '@mui/icons-material/Translate'

const lngs = {
	en: { nativeName: 'English' },
	es: { nativeName: 'Spanish' },
}

export const Navbar = () => {
	const { t, i18n } = useTranslation()
	// esto es para el menu de idiomas

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		console.log('cerrado')
		setAnchorEl(null)
	}

	return (
		<AppBar position='static' style={{ backgroundColor: '#1D1D1D' }}>
			<Container>
				<Toolbar>
					{/* boton de idiomas */}

					<Button
						sx={{
							left: '-350px',
						}}
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<TranslateIcon color='warning' />
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={() => i18n.changeLanguage('es')}>ES</MenuItem>

						<MenuItem onClick={() => i18n.changeLanguage('en')}>EN</MenuItem>
					</Menu>

					{/* logo */}

					<Box>
						<img
						src="../../styles/yugioh!.png"
						alt='yugioh!'
						 />
					</Box>

					
					<MenuItem>
						<Typography
							textAlign='center'
							variant='h5'
							noWrap
							
							sx={{
								mr: 2,
								fontFamily: 'Nunito Sans',
								
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
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/monsters_cards'}>
								<Trans i18nKey='monster'>MONSTER CARDS</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/trap_cards'}>
								<Trans i18nKey='trap'>TRAP CARDS</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/spell_cards'}>
								<Trans i18nKey='spell'>SPELL CARDS</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/all_cards'}>
								<Trans i18nKey='all'>All CARDS</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/race'}>
								<Trans i18nKey='races'>RACES</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/attributes'}>
								<Trans i18nKey='attributes'>ATTRIBUTES</Trans>
							</Link>
						</Typography>
					</MenuItem>

					<MenuItem>
						<Typography
							textAlign='center'
							variant='h6'
							sx={{
								fontFamily: 'Nunito Sans',
								
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							<Link className='linkNavbar' to={'/new_card'}>
								<Trans i18nKey='newCard'>CREATE CARDS</Trans>
							</Link>
						</Typography>
					</MenuItem>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
