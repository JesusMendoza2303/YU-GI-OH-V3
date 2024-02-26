import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { YugiohApp } from '../YugiohApp'
import { MonsterScreen } from '../components/monsterCard/MonsterScreen'
import { MagicScreen } from '../components/magicCard/MagicScreen'
import { TrapScreen } from '../components/trapCard/TrapScreen'
import { CardsDetail } from '../components/CardsDetail'
import { NewCardScreen } from '../components/new card/NewCardScreen'
import Error from '../components/Error'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<YugiohApp />} errorElement={<Error />} />
				<Route
					path='/new_card'
					element={<NewCardScreen />}
					errorElement={<Error />}
				/>
				<Route
					path='/monsters_cards'
					element={<MonsterScreen />}
					errorElement={<Error />}
				/>
				<Route
					path='/trap_cards'
					element={<TrapScreen />}
					errorElement={<Error />}
				/>
				<Route
					path='/spell_cards'
					element={<MagicScreen />}
					errorElement={<Error />}
				/>
				<Route
					path='/:cardsid'
					element={<CardsDetail />}
					errorElement={<Error />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
