/* eslint-disable react/react-in-jsx-scope */
import { Paper } from '@mui/material'
import Draggable from 'react-draggable'

const handleScreen = (
	closepopup,
	dispatch,
	createRace,
	getRaces,
	id,
	name,
	setName,
	remove,
) => {
	// manejar la creacion de una nueva raza

	const handleSubmitRace = e => {
		e.preventDefault()
		const newRace = { id, name }
		dispatch(createRace(newRace)).then(res => {
			dispatch(getRaces())
			closepopup()
		})
	}

	// elemento paper del draggable

	function PaperComponent(props) {
		return (
			<Draggable
				handle='#draggable-dialog-title'
				cancel={'[class*="MuiDialogContent-root"]'}
			>
				<Paper {...props} />
			</Draggable>
		)
	}

	// limpiar le estado para que el formulario aparezca vacio

	const clearState = () => {
		setName('')
	}

	// manejar el boton de borrado

	const handleDeleteClick = () => {
		if (confirm('are you sure to delete this card?') === true) {
			dispatch(remove()).then(res => {
				dispatch(getRaces())
			})
		}
	}

	return { handleSubmitRace, PaperComponent, clearState, handleDeleteClick }
}

export default handleScreen
