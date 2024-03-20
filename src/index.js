import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './routes/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/styles.css'
import './i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router />
	</Provider>,
)
