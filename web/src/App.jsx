import React, { Component } from 'react';
import { observable } from 'mobx'
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import moment from 'moment'
import Alert from 'react-s-alert';
import Clipboard from 'clipboard'
import appState from './AppState';

// clip location
const clipPkMonLocation = new Clipboard('.pkmon')
clipPkMonLocation.on('success', (e) => {
  Alert.success('cliped location', { timeout:  2000 })
  e.clearSelection()
})

const PKImage = (props) => {
  const { pkId } = props
  // return <img className='pkmon-image' src={`../images/${pkId}.png`} />
  return <div className={`pkmon-${pkId}`} />
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
            <a href={`https://pokevision.com/#/@${pk.latitude},${pk.longitude}`} target="_blank">
              <PKImage pkId={pk.pokemonId} />
            </a>
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
        { location.name }
      </div>
      <PKList pks={pks} />
    </div>
  )
}

@observer
class App extends Component {
  @observable showAll = false

  render() {
    const { locations, results, lastUpdates, settings, unqiuePks } = appState
    const { nearByPks, requestNearBySuccess, requestNearByPks } = appState
    const { selectedLocationIdx } = settings
    
    if (results.length <= 0) return <div>Loading...</div>

    return (
      <div>
        <div>
          <div className='pkmon-header'>
            <select className='full-width' value={selectedLocationIdx} onChange={(e) => appState.setLocationIdx(e.target.value)}>
              <option value="-1"> Select ALL Pks </option>
              { locations.map((l, i) => <option key={i} value={i} >{l.name}</option>) }
            </select>
          </div>
          <PKList pks={unqiuePks} />
        </div>
        <hr style={{margin: '20px 0'}} />
        <div>
          <div className='pkmon-header'>
            <button className='full-width' onClick={() => appState.requestNearByPks()}>GET NEAR BY PKs</button>
          </div>
          { requestNearBySuccess && <PKList pks={nearByPks.result} /> }
          { !requestNearBySuccess && <p className='text-center'>Loading...</p> }
        </div>
        <hr style={{margin: '20px 0'}} />
        <div className='pkmon-show-all-button-container'>
          <button className='full-width' onClick={() => this.showAll = !this.showAll}>
            { this.showAll ? 'Hide All' : 'Show All' } 
          </button>
        </div>
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
