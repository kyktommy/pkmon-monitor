import { observable, computed } from 'mobx'
import axios from 'axios'
import lodash from 'lodash'

const GET_PKMONS = 'http://192.168.2.197:8989/map/data'

class AppState {
  @observable locations = [
    [22.320343743143248,114.16914939880371], // hk mk east
    [22.305018737102014,114.17163848876953], // jordan
    [22.298705615987014,114.17245388031006], // tst
    [22.286078517966256,114.15215492248535], // sheung wan
    [22.2776598189047,114.17275428771973], // wan chai
    [22.323599097711785,114.21360969543457], // kowloon bay
    [22.32220962639248,114.2574691772461], // po lam
    [22.373968007511465,114.1179084777832], // tsuen wan
    [22.446452940412026,114.03486728668213], // yuen long
    [22.39382875106517,113.97268295288086], // tuen mun
    [22.312125620053337,114.22639846801758], // kwun tong
  ]
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
    axios.get(`${GET_PKMONS}/${lat}/${lng}`)
      .then(({data}) => {
        this.results[idx] = lodash.uniqBy(data.pokemon, (pk) => pk.pokemonId)
        this.lastUpdates[idx] = new Date()
      })
  }
}

export default new AppState()
