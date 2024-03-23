import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

export const FormularioTerminosCondiciones = dataTerms => {
	const agreeterm = dataTerms.dataTerms.agreeterm
	const agreetermchange = dataTerms.dataTerms.agreetermchange
	return (
		<>
			<FormControlLabel
				checked={agreeterm}
				onChange={e => {
					agreetermchange(e.target.checked)
				}}
				control={<Checkbox></Checkbox>}
				label='Agree Terms & Conditions'
			></FormControlLabel>
		</>
	)
}
