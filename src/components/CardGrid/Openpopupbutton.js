import { Grow, Typography } from '@mui/material'
import React from 'react'
import { Button } from 'react-aria-components'
import { Trans } from 'react-i18next'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export const Openpopupbutton = (checked, openPopupButton, traductorName) => {
	return (
		<div>
			{/* boton de creacion */}

			<div style={{ margin: '1%' }}>
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Button
						className='createboton'
						onClick={openPopupButton}
						startIcon={<AddCircleIcon />}
						variant='cotained'
					>
						<Typography
							sx={{
								fontFamily: 'Nunito Sans',
								fontWeight: 600,
							}}
						>
							<Trans i18nKey='crateRace'>Create a {traductorName}</Trans>
						</Typography>
					</Button>
				</Grow>
			</div>
		</div>
	)
}
