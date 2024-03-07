/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'react-aria-components'
import { useTranslation, Trans, i18n } from 'react-i18next'

export const TranslateBotton = () => {

  const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
  }

  return (
    <div>
      <div>
				{Object.keys(lngs).map(lng => (
					<Button
						type='submit'
						key={lng}
						onClick={() => i18n.changeLanguage(lng)}
						disabled={i18n.resolvedLanguage === lng}
					>
						{lngs[lng].nativeName}
					</Button>
				))}
			</div>
    </div>
  )
}

