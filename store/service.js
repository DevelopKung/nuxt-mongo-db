import routeAPI from './router'

export const state = () => ({
  listPets: null,
  loading: false
})

export const getters = {
  listPets: (state) => state.listPets,
  loading: (state) => state.loading
}

export const mutations = {
  setListPets(state, data) {
    state.listPets = data
  },
  setLoading(state, data) {
    state.loading = data
  }
}

export const actions = {
  async registerMember({ state, commit }, params) {
    try {
      commit('setLoading', true)
      const url = routeAPI.service.register;
      const res = await this.$axios.$post(url, params);
      commit('setLoading', false)
      return res
    } catch (error) {
      return error.response
    }
  },

  async getOptionPets({ state, commit }) {
    try {
      commit('setLoading', true)
      const url = routeAPI.service.option_pets;
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      commit('setLoading', false)
      commit('setListPets', res.payload)
      return res
    } catch (error) {
      return error.response
    }
  },

}