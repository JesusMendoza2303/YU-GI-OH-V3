import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Box, CircularProgress, Grow, Pagination } from '@mui/material'
import { CardGrid } from './CardGrid'
// import { PaginationBotons } from './PaginationBotons'

export const Index = data => {
	const isLoading = data.data.isLoading
	const check = data.data.check

	const count = data.data.count

	const pageSize = data.data.pageSize

	const handleChange = data.data.handleChange

	return (
		<div>
			<Navbar />
			{/* circular progress */}

			{isLoading ? (
				<Box sx={{ display: 'flex' }} justifyContent='center'>
					<CircularProgress />
				</Box>
			) : (
				<CardGrid />
			)}

			<Grow
				in={check}
				style={{ transformOrigin: '0 0 0' }}
				{...(check ? { timeout: 1000 } : {})}
			>
				<Box
					className='pagination'
					spacing={2}
					sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
				>
					<Pagination
						color='warning'
						count={Math.ceil(count / pageSize)}
						onChange={handleChange}
					/>
				</Box>
			</Grow>
		</div>
	)
}
