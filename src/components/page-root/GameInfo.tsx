import React from 'react'
import { css } from 'styled-components'
import { Modal, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { flowRight } from 'lodash-es'
import { withErrorBoundaries } from 'helpers/decorators'
import { battleshipGameSelectors } from 'store/battleshipGame/selectors'
import { battleshipGameAPI } from 'store/battleshipGame/actions'

function GameInfo() {
  const dispatch = useDispatch(),
    aliveShips = useSelector(battleshipGameSelectors.getAliveShips),
    onShowHints = React.useCallback(() => {
      dispatch(battleshipGameAPI.showHints())
      setTimeout(() => dispatch(battleshipGameAPI.showHints()), 1000)
    }, [dispatch])

  const [isModalVisible, setModalVisible] = React.useState(false),
    onClickCancel = React.useCallback(() => setModalVisible(false), []),
    onClickOk = React.useCallback(() => {
      setModalVisible(false)
      dispatch(battleshipGameAPI.restartGame())
    }, [dispatch])

  React.useEffect(() => {
    if (!aliveShips) setTimeout(() => setModalVisible(true))
  }, [aliveShips])

  return (
    <aside css={infoStyles.wrapper}>
      <p>
        Alive: <span>{aliveShips}</span>
      </p>
      <Button children="Show hints" onClick={onShowHints} />
      <Modal
        title="You win!"
        visible={isModalVisible}
        onOk={onClickOk}
        onCancel={onClickCancel}
        centered
        children="Do you want to start new game?"
      />
    </aside>
  )
}

const infoStyles = {
  wrapper: css`
    grid-area: info;
  `,
}

const withDecorators = flowRight(withErrorBoundaries(), React.memo)(GameInfo)
export { withDecorators as GameInfo }
