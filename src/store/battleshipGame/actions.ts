import { Dispatch } from 'redux'
import { NBattleshipGame } from './@types'

export const battleshipGameAPI = {
  shotCell: (params: Omit<NBattleshipGame.IShotCell, 'type'>) => (dispatch: Dispatch<NBattleshipGame.IActions>) =>
    dispatch({
      ...params,
      type: NBattleshipGame.ActionTypes.SHOT_CELL,
    }),
  showHints: () => (dispatch: Dispatch<NBattleshipGame.IActions>) =>
    dispatch({ type: NBattleshipGame.ActionTypes.SHOW_HINTS }),
  restartGame: () => (dispatch: Dispatch<NBattleshipGame.IActions>) =>
    dispatch({ type: NBattleshipGame.ActionTypes.RESTART_GAME }),
}
