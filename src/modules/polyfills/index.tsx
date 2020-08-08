import React from 'react'
import { browser } from 'constants/index'

export const detectBrowser = () => {
  const browserEngine = browser.getEngine().name
  if (browserEngine) {
    document.documentElement.classList.add(`browser-${browserEngine.toLocaleLowerCase()}`)
  }
}
