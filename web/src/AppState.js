import mobx, { observable, computed, action } from 'mobx'
import axios from 'axios'
import lodash from 'lodash'
import config from './config'
import store from 'store'
import { distance } from './utils'

class AppState {
  @observable locations = config.LOCATIONS
  @observable results = new Array(this.locations.length)
  @observable settings = {
    selectedLocationIdx: -1,  // ALL
    ...store.get('settings'),
  }
  @observable requestNearBySuccess = false
  
  @computed get nearByLocation() {
    return this.locations[0]
  }

  @computed get nearByPks() {
    let result = this.results[0] || []
    let location = this.locations[0]
    let [curLat, curLng] = location.loc

    result = lodash.sortBy(result, ((pk) => distance(pk.longitude, pk.latitude, curLng, curLat)))

    return { location: location, result: result }
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

    if (results && results.length > 0) {
      return this.toUnqiuePkmons(results)
    }
    return []
  }

  @action setLocationIdx(idx) {
    this.settings.selectedLocationIdx = idx
    store.set('settings', mobx.toJS(this.settings))
  }

  @action requestNearByPks() {
    this.requestNearBySuccess = false
    this.getNearByPks((loc) => {
      this.requestNearBySuccess = true
      this.nearByLocation.loc = loc
    })
  }

  getAllPkmons(idx) {
    const [ lat, lng ] = this.locations[idx].loc
    axios.get(`${config.GET_PKMONS_API}/${lat}/${lng}`)
      .then(({data}) => {
        this.results[idx] = this.fixAccurateGeo(data.pokemon)
      })
  }

  fixAccurateGeo(pks) {
    return pks.map((pk) => {
        pk.latitude = pk.latitude-0.0001286387
        pk.longitude = pk.longitude+0.000115123778
        return pk;
      })
  }

  toUnqiuePkmons(pks) {
    return lodash.chain(pks)
      .uniqBy((pk) => pk.pokemonId)
      .sortBy((pk) => pk.pokemonId)
      .value()
  }

  getNearByPks(cb) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords
        cb && cb([latitude, longitude])
      });
    }
  }
}

export default new AppState()
