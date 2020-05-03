import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import './app.global.css';

render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
