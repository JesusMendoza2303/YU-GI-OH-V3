import { Box, Button, Link } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const cardsActions = ({ params, rowId, setRowId }) => {
	return (
		<Box>
			<Button
				id='demo-positioned-button'
				aria-haspopup='true'
				// onClick={handleViewClick}
				startIcon={<VisibilityIcon />}
			>
				{/* <Link to={`/${ }`} className='viewcard'>
         view...
				 </Link> */}
			</Button>
			<Outlet />
		</Box>
	)
}
