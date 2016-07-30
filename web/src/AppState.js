import mobx, { observable, computed, action } from 'mobx'
import axios from 'axios'
import lodash from 'lodash'
import config from './config'
import store from 'store'

class AppState {
  @observable locations = config.LOCATIONS
  @observable results = new Array(this.locations.length)
  @observable lastUpdates = new Array(this.locations.length)
  @observable settings = {
    selectedLocationIdx: -1,  // ALL
    ...store.get('settings'),
  }

  @computed get unqiuePks() {
    const { selectedLocationIdx } = this.settings
    const pks = this.results.filter((pk) => pk) // filter undefined

    let results
    if (selectedLocationIdx == -1) {
      results = this.results.reduce((sum, item) => sum.concat(item.concat([])), [])
    } else {
      results = this.results[selectedLocationIdx]
    }

    if (pks.length > 0) {
      return lodash.uniqBy(results, (pk) => pk.pokemonId)
    }
    return []
  }

  @action setLocationIdx(idx) {
    this.settings.selectedLocationIdx = idx
    store.set('settings', mobx.toJS(this.settings))
  }

  getAllPkmons(idx) {
    const [ lat, lng ] = this.locations[idx].loc
    axios.get(`${config.GET_PKMONS_API}/${lat}/${lng}`)
      .then(({data}) => {
        this.results[idx] = lodash.uniqBy(data.pokemon, (pk) => pk.pokemonId)
        this.lastUpdates[idx] = new Date()
      })
  }
}

export default new AppState()
