/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { createcards, getcards } from '../../store/slices/thunks'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'

export const NewCardScreen = () => {
  const dispatch = useDispatch()
  const { cards = [], isLoading, page = 0 } = useSelector(state => state.cards)

  useEffect(() => {
    dispatch(getcards(page))
  }, [])

  const handlePrevPage = () => {
    if (page > 0) {
      { dispatch(getcards(page - 2)) }
      console.log(page)
    } else { dispatch(getcards(page)) }
    console.log(page)
  }

  const handleNextpage = () => {
    if (page > 0) {
      { dispatch(getcards(page)) }
    } else { dispatch(getcards(page)) }
  }

  const columns = [
    { id: 'id', name: 'ID' },
    { id: 'name', name: 'NAME' },
    { id: 'type', name: 'TYPE' },
    { id: 'desc', name: 'DESC' },
    { id: 'action', name: 'ACTION' }
  ]

  const [id] = useState(0)
  const [name, namechange] = useState('')
  const [type, typechange] = useState()
  const [desc, descchange] = useState('')
  const [open, openchange] = useState(false)
  const [agreeterm, agreetermchange] = useState(true)

  const addCard = () => {
    openpopup()
  }

  const closepopup = () => {
    openchange(false)
  }
  const openpopup = () => {
    openchange(true)
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    const naipe = { id, name, type, desc }
    dispatch(createcards(naipe))
    console.log('🚀 ~ handlesubmit ~ naipe:', naipe)
  }

  return (
    <div>
      <Navbar/>

        <Paper sx={{ margin: '1%' }}>
          <div style={{ margin: '1%' }}>
            <Button onClick={addCard} variant='cotained'>
              Add New Card
            </Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow textAlign={'center'} style={{ backgroundColor: 'midnightblue' }}>
                 {columns.map((column) =>

                <TableCell key={column.id} style={{ color: 'white' }}>
                  {column.name}
                </TableCell>

                 )}
                </TableRow>

              </TableHead>
              <TableBody>
              {cards.map((cards) => (
                <TableRow key ={cards.id}>
                  <TableCell>
                  {cards.id}
                  </TableCell>
                  <TableCell>
                  {cards.name}
                  </TableCell>
                  <TableCell>
                  {cards.type}
                  </TableCell>
                  <TableCell>
                  {cards.desc}
                  </TableCell>
                  <TableCell>
                  <Stack spacing={2} direction="row">
                  <Button className='butonspage' variant="outlined" color="secondary">Edit</Button>
                  <Button className='butonspage' variant="outlined" color='error' startIcon={<DeleteIcon />}>Delete</Button>
                  </Stack>
                  </TableCell>
                </TableRow>
              ))

          }
              </TableBody>
            </Table>

          </TableContainer>
        </Paper>

                  <Dialog open={open} onClose={closepopup} fullWidth maxWidth='sm'>
                    <DialogTitle>
                      <span>Create a Card</span>
                    </DialogTitle>
                    <DialogContent>
                    <form onSubmit={handlesubmit}>
                          <Stack spacing={2} margin= {2}>
                              <TextField required error={name.trim().length < 2 } value={name} onChange={e => { namechange(e.target.value) }} variant='outlined' label='name'></TextField>
                              <TextField required error={desc.trim().length < 2 } value={desc} onChange={e => { descchange(e.target.value) }} variant='outlined' label='dec'></TextField>
                              <RadioGroup required>
                                <Typography variant='h6' textAlign={'center'}>What type of card is it?</Typography>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Normal Monster'} control={<Radio></Radio>} label='Normal Monster'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Effect Monster'} control={<Radio></Radio>} label='Effect Monster'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Normal Tuner Monster'} control={<Radio></Radio>} label='Normal Tuner Monster'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Ritual Effect Monster'} control={<Radio></Radio>} label='Ritual Effect Monster'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Ritual Monster'} control={<Radio></Radio>} label='Ritual Monster'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Spell Card'} control={<Radio></Radio>} label='Spell Card'></FormControlLabel>

                                <FormControlLabel onChange={e => { typechange(e.target.value) }} value={'Trap Card'} control={<Radio></Radio>} label='Trap Card'></FormControlLabel>

                              </RadioGroup>

                              <FormControlLabel checked={agreeterm} onChange={e => { agreetermchange(e.target.checked) }} control={<Checkbox></Checkbox>} label='Agree Terms & Conditions'></FormControlLabel>
                              <Button disabled={!agreeterm} variant='contained' type='submit'>Submit</Button>
                          </Stack>
                        </form>
                    </DialogContent>
                  </Dialog>
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
