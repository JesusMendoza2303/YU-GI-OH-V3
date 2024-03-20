/* eslint-disable no-unused-vars */
import i18next from 'i18next'

import { initReactI18next } from 'react-i18next'
import languageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-locize-backend'

i18next
	.use(initReactI18next)
	.use(languageDetector)
	.use(Backend)
	.init({
		//  debug: true,
		fallbackLng: 'en',
		saveMissing: true,
		backend: {
			projectId: '02056acd-0db5-4c83-ab8d-1062971981f8',
			apiKey: '31cd00ca-d9e2-4a77-9c30-d56c5d90c434',
		},
	})
