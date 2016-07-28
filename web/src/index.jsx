import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import App from './App';
import { autorunAsync } from 'mobx'

const appState = new AppState();

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
  }, 30 * 1000)
}

getAllPkmonsInAllLocationsAsync()

render(
  <AppContainer>
    <App appState={appState} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp appState={appState} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
