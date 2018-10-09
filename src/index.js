import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './routes/';

import createStore from './store/createStore';

// ========================================================
// Store 实例化
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('mst-app');

let render = () => {
  ReactDOM.render(
    <AppContainer store={store} />,
    MOUNT_NODE,
  );
};

// ========================================================
// 打开开发者工具
// ========================================================
if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    // window.devToolsExtension.open();
  }
}

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // 开发模式下 使用redbox-react
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
