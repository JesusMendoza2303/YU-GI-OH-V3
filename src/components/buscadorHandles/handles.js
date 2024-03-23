const handles = (
	pageSize,
	pagination,
	setPagination,
	search,
	dispatch,
	getcardsByNameLocal2,
	setCheck,
	cards,
) => {
	// manejar el cambio en el buscador

	const handleChange = (event, page) => {
		const from = (page - 1) * pageSize
		const to = (page - 1) * pageSize + pageSize
		setPagination({ ...pagination, from, to })
	}

	// manejar el submit de bsuqueda

	const handleSubmit = e => {
		e.preventDefault()

		if (search.trim()) {
			dispatch(getcardsByNameLocal2(search, pagination))
		}
	}

	// verificar si la busqueda dio un resultado o no

	const checked = () => {
		if (cards.length < 1) {
			setCheck(true)
		}
	}

	return { handleChange, handleSubmit, checked }
}

export default handles
