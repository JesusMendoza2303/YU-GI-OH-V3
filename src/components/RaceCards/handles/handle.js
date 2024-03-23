/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux'

const handles = (
	params,
	getRaces,
	success,
	setSuccess,
	removeRaces,
	setLoading,
	editRaces,
) => {
	const dispatch = useDispatch()
	// manejar el boton de borrado

	const handledelete = () => {
		const id = params.id
		const raceId = id

		if (confirm('are you sure to delete this attribute?') === true) {
			dispatch(removeRaces(raceId)).then(res => {
				dispatch(getRaces())
			})
		}
	}

	if (success) {
		setTimeout(() => {
			setSuccess(false)
		}, 1000)
	}

	// manejar el submit

	const handleSubmit = () => {
		setLoading(true)

		const id = params.id
		const idrow = id

		const { name } = params.row

		const race = {
			name,
		}
		console.log('🚀 ~ handleSubmit ~ race:', race)

		dispatch(editRaces(idrow, race))

		setLoading(false)
		setSuccess(true)
	}

	return { handledelete, handleSubmit }
}

export default handles
