import { createSelector } from 'reselect'
import { IStore } from 'store'

export const battleshipGameSelectors = {
  get getBattleshipGame() {
    return createSelector(
      (store: IStore) => store,
      (store) => store.battleshipGame
    )
  },
  get getGameBoard() {
    return createSelector(this.getBattleshipGame, (battleshipGame) => battleshipGame.board)
  },
  isShowHints({ shipId }: any) {
    return createSelector(this.getBattleshipGame, (battleshipGame) => (shipId ? battleshipGame.showHints : false))
  },
  get getGameBoardSize() {
    return createSelector(this.getGameBoard, (board) => board.size)
  },
  get getGameBoardData() {
    return createSelector(this.getGameBoard, (board) => board.data)
  },
  get getShips() {
    return createSelector(this.getBattleshipGame, (battleshipGame) => battleshipGame.ships)
  },
  getShip({ shipId }: any) {
    return createSelector(this.getShips, (ships) => ships?.[shipId] ?? null)
  },
  getShipCell({ shipId, rowIndex, columnIndex }: any) {
    return createSelector(this.getShip({ shipId }), (ship) => ship?.coords[rowIndex][columnIndex])
  },
  get getAliveShips() {
    return createSelector(this.getShips, (ships) =>
      Object.values(ships).reduce((acc: number, current: any) => {
        if (current.cellsAlive) acc += 1
        return acc
      }, 0)
    )
  },
}
