import React from 'react'
import { SEO } from 'modules/seo'
import { WithProvider } from 'store/withProvider'

export const wrapPageElement = ({ element, props }: any) => {
  const { pageContext } = props
  return (
    <>
      <SEO locale={pageContext.locale} pageName={pageContext.pageName} />
      {element}
    </>
  )
}

export const Layout: React.FC<any> = ({ element }) => <WithProvider element={element} />
