import routeAPI from './router'
// res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
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
  async loadData({ state, commit }, pet_id) {
    commit('setLoading', true)
    const url = routeAPI.HCP.list.replace('{:pet_id}', pet_id);
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    const res = await this.$axios.$get(url, config);
    commit('setData', res)
    commit('setLoading', false)
  },

  async loadInfo({ commit }, id) {
    commit('setLoading', true)
    const url = routeAPI.appUsers.info.replace('{:id}', id);
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    config.params = { pet_id }
    const res = await this.$axios.$get(url, config);
    commit('setLoading', false)
    return res
  },

  async create({ commit, dispatch }, data) {
    commit('setLoading', true)
    const url = routeAPI.HCP.create;
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    const res = await this.$axios.$post(url, data, config);
    commit('setLoading', false)
    return res
  },


  async update({ commit, dispatch }, { id, data }) {
    commit('setLoading', true)
    const url = routeAPI.appUsers.update.replace('{:id}', id);
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    const res = await this.$axios.$put(url, data, config);
    commit('setLoading', false)
    return res
  },

  async delete({ commit, dispatch }, { id }) {
    commit('setLoading', true)
    const url = routeAPI.appUsers.delete.replace('{:id}', id);
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    const res = await this.$axios.$delete(url, config);
    if (res.status == "ok") {
      await dispatch('loadData', { show_all: 'y', force_reload: true })
    }
    commit('setLoading', false)
    return res
  }

}