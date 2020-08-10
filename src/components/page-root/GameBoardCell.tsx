import React from 'react'
import { css } from 'styled-components'
import { Checkbox } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { battleshipGameSelectors } from 'store/battleshipGame/selectors'
import { battleshipGameAPI } from 'store/battleshipGame/actions'
import { NGameBoard } from 'store/battleshipGame/@types'

interface IGameBoardCell extends NGameBoard.ICell {
  rowIndex: NGameBoard.rowIndex
  columnIndex: NGameBoard.columnIndex
}

export const GameBoardCell: React.FC<IGameBoardCell> = React.memo((props) => {
  const { rowIndex, columnIndex, shipId, isShot } = props

  const dispatch = useDispatch(),
    onCellClick = React.useCallback(
      (event: any) => {
        event.stopPropagation()
        dispatch(battleshipGameAPI.shotCell({ payload: { rowIndex, columnIndex } }))
      },
      [dispatch, rowIndex, columnIndex]
    )

  const ship = useSelector(battleshipGameSelectors.getShip({ shipId })),
    cell = useSelector(battleshipGameSelectors.getShipCell({ shipId, rowIndex, columnIndex })),
    cellBorders = cell?.borders ?? Object.prototype,
    isShowHints = useSelector(battleshipGameSelectors.isShowHints({ shipId }))

  const styles = React.useMemo(
      () => [
        cellStyles.cell,
        shipId &&
          css`
            --cellsAlive: ${ship?.cellsAlive};
          `,
        isShowHints && cellStyles.cellWithHints,
      ],
      [shipId, isShowHints]
    ),
    className = React.useMemo(
      () =>
        [
          shipId &&
            Object.keys(cellBorders)
              .map((borderPosition) => `border-${borderPosition}`)
              .join(' '),
        ]
          .filter(Boolean)
          .join(''),
      [shipId, cellBorders]
    )

  return (
    <Checkbox css={styles as any} className={className} onChange={onCellClick} disabled={isShot} checked={isShot} />
  )
})

const cellStyles = {
  cell: css`
    &.ant-checkbox-wrapper {
      margin: 0;
    }
    .ant-checkbox {
      display: flex;
    }
    .ant-checkbox,
    .ant-checkbox-inner {
      width: 100%;
      height: 100%;
    }

    .ant-checkbox-disabled .ant-checkbox-inner {
      background-color: hsl(0 70% calc(var(--cellsAlive) * 20%));
    }

    &[class*='border-'] .ant-checkbox-disabled .ant-checkbox-inner {
      border: initial !important;
    }

    ${['left', 'right', 'top', 'bottom'].reduce((dynamicStyles, currentBorderPosition) => {
      dynamicStyles += `
        &.border-${currentBorderPosition} .ant-checkbox-disabled .ant-checkbox-inner {
          border-${currentBorderPosition}: 2px solid hsl(0deg 0% 0%) !important;
        }`
      return dynamicStyles
    }, '')}
  `,
  cellWithHints: css`
    .ant-checkbox-inner {
      background-color: hsl(271 76% 53% / 0.4);
    }
  `,
}
