/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByType } from '../../store/slices/thunks'
import { CardGrid } from '../../store/slices/helpers/CardGrid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import '@fontsource/roboto/500.css'

export const TrapScreen = () => {
  const dispatch = useDispatch()
  const { isLoading, page = 0 } = useSelector(state => state.cards)
  const type = 'Trap Card'

  useEffect(() => {
    dispatch(getcardsByType(type))
  }, [])

  const handlePrevPage = () => {
    if (page > 0) {
      { dispatch(getcardsByType(type, page - 2)) }
      console.log(page)
    } else {
      dispatch(getcardsByType(type, page))
    }
  }
  const handleNextpage = () => {
    if (page > 0) {
      { dispatch(getcardsByType(type, page)) }
    } else {
      dispatch(getcardsByType(type, page))
    }
  }
  console.log(page)
  return (
    <div className='general'>
        <Navbar/>

          <CardGrid/>

          <Stack spacing={2} direction="row">
            <Button variant="outlined" className='butonspage' size="large"
            disabled={isLoading}
            onClick={handlePrevPage}>
              PREV
            </Button>
            <Button variant="outlined" className='butonspage' size="large"
            disabled={isLoading}
            onClick={handleNextpage}>
              NEXT
            </Button>
            </Stack>
            </div>

  )
}
