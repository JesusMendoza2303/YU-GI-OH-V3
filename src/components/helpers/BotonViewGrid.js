import { Visibility } from '@mui/icons-material'
import { Fab, Grow } from '@mui/material'
import React from 'react'

export const BotonViewGrid = dataView => {
	const checked = dataView.dataView.checked
	const handleNavigate = dataView.dataView.handleNavigate

	return (
		<>
			<Grow
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 1500 } : {})}
			>
				<Fab
					color='warning'
					sx={{
						width: 40,
						height: 40,
						margin: 1,
					}}
					onClick={handleNavigate}
				>
					<Visibility />
				</Fab>
			</Grow>
		</>
	)
}
