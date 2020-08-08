import React from 'react'
import loadable from '@loadable/component'
import { timeout as pTimeout } from 'promise-timeout'

interface IGetAsyncModule {
  moduleImport: any
  moduleName?: string
  minDelay?: number
  maxTimeout?: number
  withPreload?: boolean
  withSSR?: boolean
}

export function getModuleAsync({
  moduleName = 'default',
  moduleImport,
  maxTimeout = 3000,
  withPreload = false,
}: IGetAsyncModule) {
  const AsyncComponent = loadable(
    async (componentProps) => {
      const getModule = async () => ((await moduleImport(componentProps)) as any)[moduleName]
      return pTimeout(getModule(), maxTimeout).catch(() => () => {
        const [Component, setComponent] = React.useState(),
          // @ts-ignore
          onClick = React.useCallback(async () => setComponent(await getModuleAsync(arguments[0])), [])

        // @ts-ignore
        return !Component ? <button onClick={onClick}>Something went wrong... click to reload</button> : <Component />
      })
    },
    {
      fallback: <Loader />,
    }
  )

  if (withPreload) AsyncComponent.preload()

  return AsyncComponent
}

export const Loader: React.FC = () => {
  return <>Loading...</>
}
