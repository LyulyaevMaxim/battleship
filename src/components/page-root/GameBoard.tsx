import React from 'react'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { flowRight } from 'lodash-es'
import { withErrorBoundaries } from 'helpers/decorators'
import { battleshipGameSelectors } from 'store/battleshipGame/selectors'
import { GameBoardCell } from './GameBoardCell'

function GameBoard() {
  const gameBoardSize = useSelector(battleshipGameSelectors.getGameBoardSize),
    gameBoardMap = useSelector(battleshipGameSelectors.getGameBoardData),
    [rowsSize, columnsSize] = [gameBoardSize, gameBoardSize],
    Cells = React.useMemo(() => {
      const cells = []
      for (let rowIndex = 0; rowIndex < rowsSize; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < columnsSize; columnIndex += 1) {
          const cell = gameBoardMap[rowIndex][columnIndex]
          cells.push(
            <GameBoardCell
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              shipId={cell.shipId}
              isShot={cell.isShot}
              key={`cell-${rowIndex}-${columnIndex}`}
            />
          )
        }
      }
      return cells
    }, [gameBoardMap, rowsSize, columnsSize])

  return (
    <section css={boardStyles.wrapper as any} {...{ rowsSize, columnsSize }} data-testid="gameBoard-wrapper">
      {Cells}
    </section>
  )
}

const boardStyles = {
  wrapper: css<{ rowsSize: number; columnsSize: number }>`
    display: grid;
    grid-area: game-board;
    ${(props) => {
      let dynamicStyles = ''
      const cellSize = '2rem'

      dynamicStyles += `
        grid-template-columns: repeat(${props.columnsSize}, ${cellSize});
        grid-template-rows: repeat(${props.rowsSize}, ${cellSize});
      `

      return dynamicStyles
    }};
  `,
}

const withDecorators = flowRight(withErrorBoundaries(), React.memo)(GameBoard)
export { withDecorators as GameBoard }
