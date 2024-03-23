import { Check, Save } from '@mui/icons-material'
import { Fab, Grow } from '@mui/material'
import React from 'react'

export const BotonEditarGrid = dataEdit => {
	const success = dataEdit.dataEdit.success
	const checked = dataEdit.dataEdit.checked
	const green = dataEdit.dataEdit.green
	const loading = dataEdit.dataEdit.loading
	const params = dataEdit.dataEdit.params
	const handleSubmit = dataEdit.dataEdit.handleSubmit
	const rowId = dataEdit.dataEdit.rowId
	return (
		<>
			{/* boton de edicion */}

			{success ? (
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Fab
						color='primary'
						sx={{
							width: 40,
							height: 40,
							bgcolor: green[500],
							'&:hover': { bgcolor: green[700] },
						}}
					>
						<Check />
					</Fab>
				</Grow>
			) : (
				<Grow
					in={checked}
					style={{ transformOrigin: '0 0 0' }}
					{...(checked ? { timeout: 1000 } : {})}
				>
					<Fab
						color='info'
						sx={{
							width: 40,
							height: 40,
							margin: 1,
						}}
						disabled={loading || params.id !== rowId}
						onClick={handleSubmit}
					>
						<Save />
					</Fab>
				</Grow>
			)}
		</>
	)
}
