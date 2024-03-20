import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { YugiohApp } from '../YugiohApp'
import { MonsterScreen } from '../components/monsterCard/MonsterScreen'
import { MagicScreen } from '../components/magicCard/MagicScreen'
import { TrapScreen } from '../components/trapCard/TrapScreen'
import { CardsByID } from '../components/cardsByID/CardsByID'
import { NewCardScreen } from '../components/new card/NewCardScreen'
import { RaceScreen } from '../components/RaceCards/RaceScreen'
import { AttributesScreen } from '../components/AttributesCards/AttributesScreen'
import { AllCards } from '../components/allCards/AllCards'
// import FullFeaturedCrudGrid from '../components/new card/FullFeaturedCrudGrid'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<YugiohApp />} />
				<Route path='/new_card' element={<NewCardScreen />} />
				<Route path='/monsters_cards' element={<MonsterScreen />} />
				<Route path='/trap_cards' element={<TrapScreen />} />
				<Route path='/spell_cards' element={<MagicScreen />} />
				<Route path='/race' element={<RaceScreen />} />
				<Route path='/attributes' element={<AttributesScreen />} />
				<Route path='/:cardsid' element={<CardsByID />} />
				<Route path='/all_cards' element={<AllCards />} />
			</Routes>
		</BrowserRouter>
	)
}
