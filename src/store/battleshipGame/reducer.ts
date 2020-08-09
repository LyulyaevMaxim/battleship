import produce from 'immer'
import { NBattleshipGame } from './@types'

function getInitialState(): NBattleshipGame.IStore {
  return {
    showHints: false,
    board: {
      size: 10,
      data: {
        0: {
          0: { isShot: false, shipId: 'ship-1' },
          1: { isShot: false },
          2: { isShot: false, shipId: 'ship-3' },
          3: { isShot: false, shipId: 'ship-3' },
          4: { isShot: false, shipId: 'ship-3' },
          ...[5, 6, 7, 8].reduce((acc, index) => ({ ...acc, [index]: { isShot: false } }), {}),
          9: { isShot: false, shipId: 'ship-2' },
        },
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
          (acc, index) => ({
            ...acc,
            [index]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
              (acc, index) => ({ ...acc, [index]: { isShot: false } }),
              {}
            ),
          }),
          {}
        ),
      },
    },
    ships: {
      'ship-1': {
        cellsAlive: 1,
        coords: {
          0: {
            0: { isShot: false, borders: { left: true, right: true, top: true, bottom: true } },
          },
        },
      },
      'ship-2': {
        cellsAlive: 1,
        coords: {
          0: {
            9: { isShot: false, borders: { left: true, right: true, top: true, bottom: true } },
          },
        },
      },
      'ship-3': {
        cellsAlive: 3,
        coords: {
          0: {
            2: { isShot: false, borders: { left: true, top: true, bottom: true } },
            3: { isShot: false, borders: { top: true, bottom: true } },
            4: { isShot: false, borders: { right: true, top: true, bottom: true } },
          },
        },
      },
    },
  }
}

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
