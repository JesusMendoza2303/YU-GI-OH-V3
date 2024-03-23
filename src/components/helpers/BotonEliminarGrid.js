import { Delete } from '@mui/icons-material'
import { Fab, Grow } from '@mui/material'
import React from 'react'

export const BotonEliminarGrid = dataDelete => {
	const checked = dataDelete.dataDelete.checked
	const handledelete = dataDelete.dataDelete.handledelete
	return (
		<>
			<Grow
				in={checked}
				style={{ transformOrigin: '0 0 0' }}
				{...(checked ? { timeout: 1500 } : {})}
			>
				<Fab
					color='error'
					sx={{
						width: 40,
						height: 40,
						margin: 1,
					}}
					onClick={handledelete}
				>
					<Delete />
				</Fab>
			</Grow>
		</>
	)
}
