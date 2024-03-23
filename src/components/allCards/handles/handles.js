const handles = (
	setOpenSnack,
	dispatch,
	getScrollingCardsLocal,
	page,
	cards,
) => {
	// manejar el cierre del alert

	const hanldesnackclose = () => {
		setOpenSnack(false)
	}

	// manjear la pedida de mas cartas

	const fetchMoreData = () => {
		setTimeout(() => {
			dispatch(getScrollingCardsLocal(page + 1, cards))
		}, 1000)
	}

	return { hanldesnackclose, fetchMoreData }
}

export default handles
