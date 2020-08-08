// https://www.gatsbyjs.org/docs/gatsby-config/
import * as env from 'dotenv'
import { siteMetadata } from './src/constants'

env.config({ path: `.env.${process.env.NODE_ENV}` })

const connectSystemFiles = [
  { name: 'images', path: `${__dirname}/src/images` },
  { name: 'data', path: `${__dirname}/src/` },
].map((options) => ({ resolve: 'gatsby-source-filesystem', options }))

module.exports = {
  pathPrefix: `/react-project`,
  siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
      },
    },
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-transition-link',
    ...connectSystemFiles,
    'gatsby-transformer-json',
    // images: optimizations and GraphQL
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    //---------------- for PWA ----------------
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Project',
        short_name: 'Project',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        icon: 'src/images/favicon.png',
        display: 'minimal-ui',
      },
    },
    process.env.isProduction && 'gatsby-plugin-offline',
  ],
}
