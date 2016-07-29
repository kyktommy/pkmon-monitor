import { observable, computed } from 'mobx'
import axios from 'axios'
import lodash from 'lodash'
import config from './config'

class AppState {
  @observable locations = config.LOCATIONS
  @observable results = new Array(this.locations.length)
  @observable lastUpdates = new Array(this.locations.length)

  @computed get unqiuePks() {
    const pks = this.results.filter((pk) => pk)
    if (pks.length > 0) {
      const flattened = this.results.reduce((sum, item) => sum.concat(item.concat([])), [])
      return lodash.uniqBy(flattened, (pk) => pk.pokemonId)
    }
    return []
  }

  getAllPkmons(idx) {
    const [ lat, lng ] = this.locations[idx]
    axios.get(`${config.GET_PKMONS_API}/${lat}/${lng}`)
      .then(({data}) => {
        this.results[idx] = lodash.uniqBy(data.pokemon, (pk) => pk.pokemonId)
        this.lastUpdates[idx] = new Date()
      })
  }
}

export default new AppState()
