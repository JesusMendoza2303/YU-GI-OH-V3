/* eslint-disable camelcase */
const allHandles = (
	values,
	setValues,
	setCard_images,
	loading,
	setSuccess,
	setLoading,
	timer,
	card_images,
	id,
	createCard,
	dispatch,
	getcardsGrid,
	closepopup,
) => {
	const handleConsole = () => {
		console.log('🚀 ~ allHandles ~ values:', values)
	}

	const handleConsoleCustom = element => {
		console.log('🚀 ~ handleConsoleCustom ~ element:', element)
	}

	// clearstate, para que cuando se vuelva a abrir el formulario este limpio

	const clearstate = () => {
		console.log('se ha limpiado')
		setCard_images('')
		setValues(preValues => ({
			...preValues,
			name: '',
			desc: '',
			atk: 0,
			def: 0,
			level: 1,
			race: '',
			type: '',
			firstdate: '',
			lastdate: '',
		}))
	}

	// manejar el submit

	const handlesubmit = e => {
		console.log('se ha enviado')
		//  boton de carga
		e?.preventDefault()
		if (!loading) {
			setSuccess(false)
			setLoading(true)
			timer.current = window.setTimeout(() => {
				setSuccess(true)
				setLoading(false)
			}, 2000)
		}
		//  logica
		const {
			name,
			desc,
			atk,
			def,
			level,
			race,
			type,
			firstdate,
			lastdate,
			attribute,
		} = values

		const imagesArray = []
		imagesArray.push({
			image_url: card_images,
		})

		const naipe = {
			id,
			name,
			desc,
			atk,
			def,
			level,
			race,
			attribute,
			type,
			firstdate,
			lastdate,
		}

		naipe.card_images = imagesArray

		dispatch(createCard(naipe)).then(res => {
			dispatch(getcardsGrid())

			closepopup()
		})
	}

	// manejar el cambio de los values

	const handleChange = e => {
		e.preventDefault()
		const { value, name } = e.target

		setValues(preValues => ({
			...preValues,
			[name]: value,
		}))
	}

	const handleChangeSelection = (field, value) => {
		const { name } = value
		setValues(preValues => ({
			...preValues,
			[field]: name,
		}))
	}

	return {
		handleConsole,
		handleConsoleCustom,
		clearstate,
		handlesubmit,
		handleChange,
		handleChangeSelection,
	}
}

export default allHandles
