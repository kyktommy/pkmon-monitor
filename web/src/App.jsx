import React, { Component } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import moment from 'moment'
import Alert from 'react-s-alert';
import Clipboard from 'clipboard'

import appState from './AppState';

const clipPkMonLocation = new Clipboard('.pkmon')
clipPkMonLocation.on('success', (e) => {
  Alert.success('cliped')
  e.clearSelection()
})

const PKImage = (props) => {
  const { pkId } = props
  return <img className='pkmon-image' src={`../images/${pkId}.png`} />
}

const PKList = (props) => {
  const { pks } = props
  return (
    <div>
      { 
        pks.map((pk, j) => 
          <span
            key={j} 
            className="pkmon" 
            data-clipboard-text={`${pk.latitude},${pk.longitude}`}
          >
            <PKImage pkId={pk.pokemonId} />
          </span>
        ) 
      }
    </div>
  )
}

const LocationPKInfo = (props) => {
  const { location, pks, lastUpdated } = props
  // Last Updated { moment(lastUpdated).fromNow() }
  return (
    <div>
      <div>
        { location[0] }, { location[1] }
      </div>
      <PKList pks={pks} />
    </div>
  )
}

@observer
class App extends Component {
  @observable showAll = false

  render() {
    const { locations, results, lastUpdates, unqiuePks } = appState

    if (results.length <= 0) return <div>Loading...</div>

    return (
      <div>
        <div>
          <h5>All</h5>
          <PKList pks={unqiuePks} />
        </div>
        <hr />
        <button onClick={() => this.showAll = !this.showAll}>Toggle Show All</button>
        {
          this.showAll &&
          results.map((pks, i) => {
            return (
              <LocationPKInfo 
                key={i} 
                location={locations[i]}
                pks={results[i]}
                lastUpdated={lastUpdates[i]}
              />
            )
          })
        }
        <Alert 
          position='bottom-right'
          stack={{limit: 3}} 
        />
      </div>
    );
  }
};

export default App;
