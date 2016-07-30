import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { autorunAsync } from 'mobx'
import config from './config'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import './sprites.css'
import './style.css'

import appState from './AppState'

function getAllPkmonsInAllLocations() {
  const { locations } = appState
  const len = locations.length
  for (let i=0; i<len; i++) {
    appState.getAllPkmons(i)
  }
}

function getAllPkmonsInAllLocationsAsync() {
  getAllPkmonsInAllLocations()
  autorunAsync(() => {
    getAllPkmonsInAllLocations()
    // next loop
    getAllPkmonsInAllLocationsAsync()
  }, config.REFRESH_TIME)
}

getAllPkmonsInAllLocationsAsync()

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot && !PRODUCTION) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
