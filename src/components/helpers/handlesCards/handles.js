const handles = (pageSize, setPagination, pagination) => {
	// manejar la paginacion

	const handleChange = (event, page) => {
		const from = (page - 1) * pageSize
		const to = (page - 1) * pageSize + pageSize
		setPagination({ ...pagination, from, to })
	}

	return { handleChange }
}

export default handles
