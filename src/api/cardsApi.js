import axios from 'axios'

// export const cardsApi = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL;
// })

export const cardsApi = axios.create({
  baseURL: 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
})
