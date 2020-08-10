import produce from 'immer'
import { NBattleshipGame, NGameBoard, NShips } from './@types'

export const battleshipGameReducer = produce((draft: NBattleshipGame.IStore, action: NBattleshipGame.IActions) => {
  switch (action.type) {
    case NBattleshipGame.ActionTypes.SHOT_CELL: {
      const { rowIndex, columnIndex } = action.payload,
        cell = draft.board.data[rowIndex][columnIndex],
        { shipId } = cell

      cell.isShot = true

      if (shipId) {
        const ship = draft.ships[shipId]
        ship.coords[rowIndex][columnIndex].isShot = true
        ship.cellsAlive -= 1
      }
      break
    }

    case NBattleshipGame.ActionTypes.RESTART_GAME: {
      const newState = getInitialState()
      ;(Object.keys(newState) as Array<keyof NBattleshipGame.IStore>).forEach((key) => {
        // @ts-ignore
        draft[key] = newState[key]
      })
      break
    }

    case NBattleshipGame.ActionTypes.SHOW_HINTS: {
      draft.showHints = !draft.showHints
      break
    }
  }
}, getInitialState())

function getInitialState(): NBattleshipGame.IStore {
  const boardSize = 10,
    boardData: NBattleshipGame.IStore['board']['data'] = Array(boardSize)
      .fill(null)
      .map(() =>
        Array(boardSize)
          .fill(null)
          .map(() => ({ isShot: false }))
      ),
    ships: NBattleshipGame.IStore['ships'] = {}

  const shipsForCreating = [
    { type: NShips.ShipTypes.DOT_SHAPED, amount: 2 },
    { type: NShips.ShipTypes.I_SHAPED, amount: 1 },
    { type: NShips.ShipTypes.L_SHAPED, amount: 1 },
  ]

  shipsForCreating.forEach(({ type, amount }) => {
    for (let i = 0; i < amount; i += 1) shipCreate({ type })
  })

  function shipCreate({ type }: { type: NShips.ShipTypes }) {
    let isCreated = false
    const shipId = `ship-${getRandomInt(boardSize * boardSize)}`
    switch (type) {
      case NShips.ShipTypes.DOT_SHAPED: {
        do {
          const rowIndex = getRandomInt(boardSize),
            columnIndex = getRandomInt(boardSize)

          if (isCellFree({ rowIndex, columnIndex })) {
            ships[shipId] = {
              cellsAlive: 1,
              coords: {
                [rowIndex]: {
                  [columnIndex]: { isShot: false, borders: { left: true, right: true, top: true, bottom: true } },
                },
              },
            }

            setCellBlocked({ rowIndex, columnIndex, shipId })

            isCreated = true
          }
        } while (!isCreated)
        break
      }

      case NShips.ShipTypes.I_SHAPED: {
        do {
          const rotation = Math.random() > 0.5 ? 'horizontal' : 'vertical',
            isHorizontalRotation = rotation === 'horizontal',
            rowIndex = getRandomInt(boardSize - Number(!isHorizontalRotation) * 2 - Number(isHorizontalRotation)),
            columnIndex = getRandomInt(boardSize - Number(isHorizontalRotation) * 2 - Number(!isHorizontalRotation)),
            coordsArray = [
              ...Array(3)
                .fill(null)
                .map((_, index) => ({
                  rowIndex: rowIndex + Number(!isHorizontalRotation) * index,
                  columnIndex: columnIndex + Number(isHorizontalRotation) * index,
                })),
              {
                rowIndex: rowIndex + (isHorizontalRotation ? 1 : 2),
                columnIndex: columnIndex + (isHorizontalRotation ? 2 : 1),
              },
            ]

          if (coordsArray.every(isCellFree)) {
            ships[shipId] = {
              cellsAlive: 4,
              coords: {},
            }

            coordsArray.forEach(({ rowIndex, columnIndex }, index) => {
              if (!(rowIndex in ships[shipId].coords)) ships[shipId].coords[rowIndex] = {}

              ships[shipId].coords[rowIndex][columnIndex] = {
                isShot: false,
                borders: (() => {
                  switch (index) {
                    case 0:
                      return isHorizontalRotation
                        ? { left: true, top: true, bottom: true }
                        : { left: true, top: true, right: true }
                    case 1:
                      return isHorizontalRotation ? { top: true, bottom: true } : { left: true, right: true }
                    case 2:
                      return isHorizontalRotation ? { right: true, top: true } : { left: true, bottom: true }
                    case 3:
                      return isHorizontalRotation
                        ? { right: true, bottom: true, left: true }
                        : { bottom: true, right: true, top: true }
                    default:
                      return {}
                  }
                })(),
              }

              setCellBlocked({ rowIndex, columnIndex, shipId })
            })

            isCreated = true
          }
        } while (!isCreated)
        break
      }

      case NShips.ShipTypes.L_SHAPED: {
        do {
          const rotation = Math.random() > 0.5 ? 'horizontal' : 'vertical',
            isHorizontalRotation = rotation === 'horizontal',
            rowIndex = getRandomInt(boardSize - Number(!isHorizontalRotation) * 2),
            columnIndex = getRandomInt(boardSize - Number(isHorizontalRotation) * 2),
            coordsArray = Array(3)
              .fill(null)
              .map((_, index) => ({
                rowIndex: rowIndex + Number(!isHorizontalRotation) * index,
                columnIndex: columnIndex + Number(isHorizontalRotation) * index,
              }))

          if (coordsArray.every(isCellFree)) {
            ships[shipId] = {
              cellsAlive: 3,
              coords: {},
            }

            coordsArray.forEach(({ rowIndex, columnIndex }, index) => {
              if (!(rowIndex in ships[shipId].coords)) ships[shipId].coords[rowIndex] = {}

              ships[shipId].coords[rowIndex][columnIndex] = {
                isShot: false,
                borders: (() => {
                  switch (index) {
                    case 0:
                      return isHorizontalRotation
                        ? { left: true, top: true, bottom: true }
                        : { left: true, top: true, right: true }
                    case 1:
                      return isHorizontalRotation ? { top: true, bottom: true } : { left: true, right: true }
                    case 2:
                      return isHorizontalRotation
                        ? { right: true, top: true, bottom: true }
                        : { left: true, bottom: true, right: true }
                    default:
                      return {}
                  }
                })(),
              }

              setCellBlocked({ rowIndex, columnIndex, shipId })
            })

            isCreated = true
          }
        } while (!isCreated)
        break
      }
    }
  }

  return {
    showHints: false,
    board: {
      size: boardSize,
      data: boardData,
    },
    ships,
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  type ICellCoords = {
    rowIndex: NGameBoard.rowIndex
    columnIndex: NGameBoard.columnIndex
  }

  function isCellFree({ rowIndex, columnIndex }: ICellCoords) {
    const boardCell = boardData[rowIndex][columnIndex]
    return !boardCell.isBlocked && !boardCell.shipId
  }

  function setCellBlocked({ rowIndex, columnIndex, shipId }: ICellCoords & { shipId: NShips.shipId }) {
    boardData[rowIndex][columnIndex].shipId = shipId

    if (columnIndex > 0) boardData[rowIndex][columnIndex - 1].isBlocked = true //left
    if (columnIndex + 1 < boardSize) boardData[rowIndex][columnIndex + 1].isBlocked = true //right

    if (rowIndex > 0) {
      boardData[rowIndex - 1][columnIndex].isBlocked = true //top
      if (columnIndex > 0) boardData[rowIndex - 1][columnIndex - 1].isBlocked = true //top left
      if (columnIndex + 1 < boardSize) boardData[rowIndex - 1][columnIndex + 1].isBlocked = true //top right
    }

    if (rowIndex + 1 < boardSize) {
      boardData[rowIndex + 1][columnIndex].isBlocked = true //bottom
      if (columnIndex > 0) boardData[rowIndex + 1][columnIndex - 1].isBlocked = true //bottom left
      if (columnIndex + 1 < boardSize) boardData[rowIndex + 1][columnIndex + 1].isBlocked = true //bottom right
    }
  }
}
