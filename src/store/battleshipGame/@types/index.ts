export namespace NBattleshipGame {
  export interface IStore {
    showHints: boolean
    board: NGameBoard.IBoard
    ships: NShips.IShips
  }

  export type IActions = IShotCell | IGameRestart | IShowHints

  export enum ActionTypes {
    SHOT_CELL = 'SHOT_CELL',
    RESTART_GAME = 'RESTART_GAME',
    SHOW_HINTS = 'SHOW_HINTS',
  }

  export interface IShotCell {
    type: ActionTypes.SHOT_CELL
    payload: {
      rowIndex: NGameBoard.rowIndex
      columnIndex: NGameBoard.columnIndex
    }
  }

  export interface IGameRestart {
    type: ActionTypes.RESTART_GAME
  }

  export interface IShowHints {
    type: ActionTypes.SHOW_HINTS
  }
}

export namespace NGameBoard {
  export interface ICell {
    isShot: boolean
    isBlocked?: boolean
    shipId?: NShips.shipId
  }

  export type rowIndex = number
  export type columnIndex = number

  export interface IBoard {
    size: number
    data: Record<rowIndex, Record<columnIndex, ICell>>
  }
}

export namespace NShips {
  interface IShipCell {
    isShot: boolean
    borders: { left?: boolean; right?: boolean; top?: boolean; bottom?: boolean }
  }

  interface IShip {
    cellsAlive: number
    coords: Record<number, Record<number, IShipCell>>
  }

  export enum ShipTypes {
    DOT_SHAPED = 'DOT_SHAPED',
    I_SHAPED = 'I_SHAPED',
    L_SHAPED = 'L_SHAPED',
  }

  export interface IShipDotShaped extends IShip {
    cellsAlive: 1
  }

  interface IShipIShaped extends IShip {
    cellsAlive: 3
  }

  interface IShipLShaped extends IShip {
    cellsAlive: 4
  }

  export type shipId = string

  export type IShips = Record<shipId, IShipDotShaped | IShipIShaped | IShipLShaped>
}
