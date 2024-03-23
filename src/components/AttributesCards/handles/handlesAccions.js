const handlesAccions = (
	setLoading,
	params,
	dispatch,
	editAttribute,
	setSuccess,
	success,
	removeAttribute,
	getAttributes,
) => {
	// manejar el submit de edicion

	const handleSubmit = () => {
		setLoading(true)
		const id = params.id
		const idrow = id
		console.log('🚀 ~ handleSubmit ~ idrow:', idrow)
		const { name } = params.row
		console.log('🚀 ~ handleSubmit ~ name:', name)

		const naipe = {
			name,
		}
		dispatch(editAttribute(idrow, naipe))

		setLoading(false)
		setSuccess(true)
	}

	if (success) {
		setTimeout(() => {
			setSuccess(false)
		}, 1000)
	}

	const handledelete = () => {
		const id = params.id
		const attributeId = id

		if (confirm('are you sure to delete this attribute?') === true) {
			dispatch(removeAttribute(attributeId)).then(res => {
				dispatch(getAttributes())
			})
		}
	}

	return { handleSubmit, handledelete }
}

export default handlesAccions
