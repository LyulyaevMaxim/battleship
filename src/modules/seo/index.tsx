import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export function SEO({ locale, pageName }: any) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  const { siteMetadata } = data.site,
    { title } = siteMetadata

  return (
    <Helmet
      htmlAttributes={{
        lang: locale,
      }}
      title={siteMetadata.title}
      defer={false}
      meta={[
        {
          name: `description`,
          content: siteMetadata.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: siteMetadata.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: siteMetadata.description,
        },
      ]}
    >
      <base href="/" />
      <link href="/fonts/ProximaNova/proxima-nova.css" rel="stylesheet" />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/ProximaNova/proxima-nova-regular.woff2"
      />
    </Helmet>
  )
}
