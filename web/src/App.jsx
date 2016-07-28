import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import moment from 'moment'

const PKImage = (props) => {
  const { id } = props
  return <img src={`../images/${id}.png`} />
}

const PKList = (props) => {
  const { pks } = props
  return <div>{ pks.map((pk, j) => <PKImage key={j} id={pk.pokemonId} />) }</div>
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
  render() {
    const { locations, results, lastUpdates } = this.props.appState

    if (results.length <= 0) return <div>Loading...</div>

    return (
      <div>
        {
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
      </div>
    );
  }
};

export default App;
