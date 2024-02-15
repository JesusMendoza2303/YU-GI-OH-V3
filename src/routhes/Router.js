import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { YugiohApp } from '../YugiohApp'
import { MonsterScreen } from '../components/monsterCard/MonsterScreen'
import { MagicScreen } from '../components/magicCard/MagicScreen'
import { TrapScreen } from '../components/trapCard/TrapScreen'
import { CardsDetail } from '../components/CardsDetail'
import { NewCardScreen } from '../components/new card/NewCardScreen'

export const Router = () => {
  return (
  <BrowserRouter>
    <Routes>
        <Route path='/'element= {<YugiohApp/>} />
        <Route path='/new_card'element= {<NewCardScreen/>} />
        <Route path='/monsters_cards'element= {<MonsterScreen/>} />
        <Route path='/trap_cards'element= {<TrapScreen/>} />
        <Route path='/spell_cards'element= {<MagicScreen/>} />
        <Route path='/:cardsid'element= {<CardsDetail/>} />
    </Routes>
</BrowserRouter>
  )
}
