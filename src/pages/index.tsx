import React from 'react'
import { css } from 'styled-components'
import { GameBoard, GameInfo } from 'components/page-root'

export default function PageRoot() {
  return (
    <main data-testid="pageMain-wrapper" css={pageMainStyles.wrapper}>
      <h1 children="Battleship" css={pageMainStyles.title} />
      <GameInfo />
      <GameBoard />
    </main>
  )
}

const pageMainStyles = {
  wrapper: css`
    display: grid;
    grid-template-areas: 'title title' 'game-board info';
    column-gap: 2rem;
    row-gap: 1rem;
    justify-content: center;
    align-items: flex-start;
    padding: 1.5rem;
  `,
  title: css`
    grid-area: title;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  `,
}
