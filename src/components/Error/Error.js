/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Box, CardMedia, Grow, Typography } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import stiker from '../../styles/yugiohstiker.png'

export const Error = () => {
	const [check, setCheck] = useState(true)
	const { t, i18n } = useTranslation()

	return (
		<div>
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
				<Trans i18nKey='errorTitle'>This page does not exist</Trans>
			</Typography>
			<Typography
				justifyContent={'center'}
				variant='h4'
				component='h4'
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
				<Trans i18nKey='errorSubTitle'>error 404 not found</Trans>
			</Typography>
			{/* imagen */}

			<Box
				sx={{
					textAlign: 'center',
				}}
			>
				<Grow
					in={check}
					style={{ transformOrigin: '0 0 0' }}
					{...(check ? { timeout: 1000 } : {})}
				>
					<img src={stiker} alt='image Error' height={500} />
				</Grow>
			</Box>
		</div>
	)
}
