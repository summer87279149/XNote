import * as types from './mutation-types'

const mutations = {
  [types.SET_ALL_YEARS_DATA](state, data) {
    state.allYearsData = data
  }
}

export default mutations
