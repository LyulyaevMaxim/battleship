import Bowser from 'bowser'

export const siteMetadata = {
  title: 'Battleship',
  description: 'Description',
  author: 'Lyulyaev Maxim',
  siteUrl: `https://battleship.com`,
}

export const routes = {
  home: '/',
}

export const browser = Bowser.getParser(typeof window !== 'undefined' ? window.navigator.userAgent : 'Null')
