/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getcardsByName } from './store/slices/thunks'
import { CardGrid } from './store/slices/helpers/CardGrid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import '@fontsource/roboto/500.css'

export const YugiohApp = () => {
  const dispatch = useDispatch()
  const [search, setsearch] = useState('')
  const { isLoading, page, msgError } = useSelector(state => state.cards)

  useEffect(() => {
    dispatch(getcardsByName(search))
  }, [])

  const handlePrevPage = () => {
    if (page > 0) {
      { dispatch(getcardsByName(search, page - 2)) }
      console.log(page)
    } else { dispatch(getcardsByName(search, page)) }
    console.log(page)
  }

  const handleNextpage = () => {
    if (page > 0) {
      { dispatch(getcardsByName(search, page)) }
    } else { dispatch(getcardsByName(search, page)) }
  }

  const handleInputChange = (e) => {
    setsearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (search.trim()) {
      dispatch(getcardsByName(search))
    }
  }

  console.log(search)
  console.log(msgError)

  return (
    <div className='general'>
        <Navbar/>
        <Typography variant="h2" component="h3" className='principalTitle'>
           Which card do you want to search?
        </Typography>
        <div>

      <Box
      className='inputbusqueda'
      onSubmit={handleSubmit}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
       >
      <TextField id="outlined-basic" label="Search a Card" variant="outlined" margin="normal"
      onChange={(e) => { setsearch(e.target.value) }}/>

      </Box>

                <CardGrid/>
        </div>
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
            // </div>

  )
}
