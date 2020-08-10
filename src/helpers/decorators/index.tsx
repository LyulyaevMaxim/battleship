import React from 'react'

interface IWithErrorBoundariesSettings {
  isWrapperHandler?: boolean
  customError?: null | ((errorInfo: IWrapperState) => React.ReactNode)
}

interface IWithErrorBoundaries {
  stateKey: string
  (settings?: IWithErrorBoundariesSettings): (Component: any) => React.ComponentType<any>
}

interface IWrapperState {
  hasError: boolean
}

/** After error:
 * withErrorBoundaries()(SomeComponent)
 wrapper will replace children to renderDefaultError

 * withErrorBoundaries({customError: OtherComp})(SomeComponent)
 wrapper will replace children to OtherComp

 * withErrorBoundaries({isWrapperHandler: null})(SomeComponent)
 wrapper will ignore error, SomeComponent must use props[withErrorBoundaries.stateKey] for custom error handling
 */

export const withErrorBoundaries: IWithErrorBoundaries = (settings = Object.prototype) => (Component) =>
  class Wrapper extends React.Component<any, IWrapperState> {
    static displayName = `withErrorBoundaries(${displayNameCreate(Component)})`

    state = { hasError: false }

    static getDerivedStateFromError(error: any) {
      return { hasError: true, error }
    }

    renderDefaultError = () => <h1>Something went wrong</h1>

    /*componentDidCatch(error, errorInfo) {
      showNotification()
      sendErrorToLog(error, errorInfo);
    }*/

    render() {
      const { isWrapperHandler = true, customError = this.renderDefaultError } = settings,
        { hasError } = this.state

      if (isWrapperHandler && hasError) return customError ? customError(this.state) : null

      return <Component {...this.props} {...{ [`${withErrorBoundaries.stateKey}`]: this.state }} />
    }
  }

withErrorBoundaries.stateKey = 'withErrorBoundaries'

const displayNameCreate = (Component: any) => Component.displayName || Component.name || 'Component'
