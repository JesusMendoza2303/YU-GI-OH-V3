/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
	Autocomplete,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import React from 'react'
import { Trans } from 'react-i18next'

export const FormularioBase = data => {
	const values = data.data.values

	const handleChange = data.data.handleChange

	const setCard_images = data.data.setCard_images

	const card_images = data.data.card_images

	const handleChangeSelection = data.data.handleChangeSelection

	const filter = data.data.filter

	const races = data.data.races

	const attributes = data.data.attributes

	return (
		<>
			{/* formulario de nombre */}

			<TextField
				required
				error={values.name.trim().length < 2}
				name='name'
				value={values.name}
				onChange={e => {
					handleChange(e)
				}}
				variant='outlined'
				label='name'
			></TextField>

			{/* formulario de descripcion */}

			<TextField
				required
				error={values.desc.trim().length < 2}
				name='desc'
				value={values.desc}
				onChange={e => {
					handleChange(e)
				}}
				variant='outlined'
				label='dec'
			></TextField>

			{/* formulario de imagenes */}

			<TextField
				required
				value={card_images}
				name='image'
				onChange={e => {
					setCard_images(e.target.value)
				}}
				variant='outlined'
				label='incerta la url de la imagen'
			></TextField>

			{/* formulario de nivel */}

			<TextField
				required
				type='number'
				error={values.level < 1}
				value={values.level}
				name='level'
				onChange={e => {
					handleChange(e)
				}}
				variant='outlined'
				label='level'
			></TextField>

			{/* formulario de tipos */}

			<RadioGroup required>
				<Typography variant='h6' textAlign={'center'}>
					<Trans i18nKey='TypeForm'>What type of card is it?</Trans>
				</Typography>

				<FormControlLabel
					name='type'
					value={'Normal Monster'}
					onChange={e => {
						handleChange(e)
					}}
					control={<Radio></Radio>}
					label='Normal Monster'
				></FormControlLabel>

				<FormControlLabel
					name='type'
					value={'Spell Card'}
					onChange={e => {
						handleChange(e)
					}}
					control={<Radio></Radio>}
					label='Spell Card'
				></FormControlLabel>

				<FormControlLabel
					name='type'
					value={'Trap Card'}
					onChange={e => {
						handleChange(e)
					}}
					control={<Radio></Radio>}
					label='Trap Card'
				></FormControlLabel>
			</RadioGroup>

			{/* formulario de raza */}

			<Autocomplete
				required
				value={values.race}
				name='race'
				onChange={(e, value) => {
					handleChangeSelection('race', value)
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params)

					const { inputValue } = params

					return filtered
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				id='free-solo-with-text-demo'
				options={races}
				getOptionLabel={option => {
					// Value selected with enter, right from the input
					if (typeof option === 'string') {
						return option
					}
					// Add "xxx" option created dynamically
					if (option.inputValue) {
						return option.inputValue
					}
					// Regular option

					return option.name
				}}
				renderOption={(props, option) => <li {...props}>{option.name}</li>}
				freeSolo
				renderInput={params => (
					<TextField
						{...params}
						label='Race'
						variant='outlined'
						fullWidth
						id='fullWidth'
					/>
				)}
			/>

			{/* formulario de atributo */}

			<Autocomplete
				required
				disabled={values.type === 'Spell Card' || values.type === 'Trap Card'}
				value={values.attribute}
				name='attribute'
				onChange={(e, value) => {
					handleChangeSelection('attribute', value)
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params)

					const { inputValue } = params

					return filtered
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				id='free-solo-with-text-demo'
				options={attributes}
				getOptionLabel={option => {
					// Value selected with enter, right from the input
					if (typeof option === 'string') {
						return option
					}
					// Add "xxx" option created dynamically
					if (option.inputValue) {
						return option.inputValue
					}
					// Regular option

					return option.name
				}}
				renderOption={(props, option) => <li {...props}>{option.name}</li>}
				freeSolo
				renderInput={params => (
					<TextField
						{...params}
						label='Attribute'
						variant='outlined'
						fullWidth
						id='fullWidth'
						onChange={e => {
							handleChange(e)
						}}
					/>
				)}
			/>

			{/* formulario de ataque */}

			<TextField
				type='number'
				name='atk'
				disabled={values.type === 'Spell Card' || values.type === 'Trap Card'}
				value={values.atk}
				error={values.atk < 0}
				onChange={e => {
					handleChange(e)
				}}
				variant='outlined'
				label='atk'
			></TextField>

			{/* formulario de defensa */}

			<TextField
				type='number'
				name='def'
				disabled={values.type === 'Spell Card' || values.type === 'Trap Card'}
				required={values.def > 0}
				value={values.def}
				error={values.def < 0}
				onChange={e => {
					handleChange(e)
				}}
				variant='outlined'
			></TextField>
		</>
	)
}
