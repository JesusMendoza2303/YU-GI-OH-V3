import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './routhes/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router />
	</Provider>,
)
