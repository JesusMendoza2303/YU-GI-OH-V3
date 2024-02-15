/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Navbar } from './Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByID } from '../store/slices/thunks'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import '@fontsource/roboto/500.css'

export const CardsDetail = () => {
  const dispatch = useDispatch()
  const { cardsid } = useParams()
  const { cards = [] } = useSelector(state => state.cards)
  console.log('🚀 ~ CardsDetail ~ cards:', cards)

  useEffect(() => {
    dispatch(getcardsByID(cardsid))
  }, [])

  return (
    <>
    <Navbar/>
    <Card sx={{ display: 'flex' }} className='cardDetail'>
      <Box sx={{ display: 'flex', flexDirection: 'column' } }className='CardContent'>
        <CardContent sx={{ flex: '1 0 auto' }} >
        <div>
            {cards.map((cards) => (
              <div key={cards.id} >

          <Typography component="div" variant="h3">
            {cards.name}
          </Typography>
          <br/>
          <Typography variant="h5" color="white" component="div">
            {cards.desc}
          </Typography>

          <Typography variant="h6" color="white">
                  <p className='parrafo'>ID: {cards.id}</p>
                  <p className='parrafo'>Type: {cards.type}</p>
                  <p className='parrafo'>{(!(cards.race) ? 'this card dont have race' : `race: ${cards.race}`)}</p>
                  <p className='parrafo'>{(!(cards.level) ? 'this card dont have level' : `level: ${cards.level}`)}</p>
                  <p className='parrafo'>{(!(cards.atk) ? undefined : `atk: ${cards.atk} `)}</p>
                  <p className='parrafo'>{(!(cards.def) ? undefined : `def: ${cards.def}`)}</p>

              </Typography>

          </div>))}
              </div>
        </CardContent>

      </Box>
      <div className='CardContent'>
            {cards.map((cards) => (
              <div key={cards.id} >
                <CardMedia
                  component="img"
                  sx={{ width: 350 }}
                  image ={cards.card_images[0]?.image_url}
                  alt={cards.name}
                />
          </div>))}
              </div>

    </Card>

    </>
  )
}
