import { Get_all_req_succ, Make_req, Get_all_req_fail } from './ActionsType'

export const makeRequest = () => {
  return {
    type: Make_req
  }
}
export const getallRequestsucces = (data) => {
  return {
    type: Get_all_req_succ,
    payload: data
  }
}
export const getAllRequestFail = (err) => {
  return {
    type: Get_all_req_fail,
    payload: data
  }
}
