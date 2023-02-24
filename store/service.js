import routeAPI from './router'

export const state = () => ({
  lists: [],
  loading: false
})

export const getters = {
  lists: (state) => state.lists,
  loading: (state) => state.loading
}

export const mutations = {
  setData(state, data) {
    state.lists = data
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

}