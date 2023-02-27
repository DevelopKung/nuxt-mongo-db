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
  async loadData({ state, commit }, user_id) {
    try {
      commit('setLoading', true)
      const url = routeAPI.pets.list.replace('{:user_id}', user_id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      commit('setData', res)
      commit('setLoading', false)
    } catch (error) {
      console.log(error);
      return error
    }
  },

  async loadInfo({ commit }, params) {
    if (params.user_id && params.id) {
      commit('setLoading', true)
      const url = routeAPI.pets.info
        .replace('{:user_id}', params.user_id)
        .replace('{:id}', params.id);
      let config = { headers: { Authorization: this.$auth.getToken('local') } }
      const res = await this.$axios.$get(url, config);
      commit('setLoading', false)
      return res.payload
    }
  },

  async create({ commit, dispatch }, params) {
    try {
      commit('setLoading', true)
      const url = routeAPI.pets.create;
      const formData = new FormData();
      formData.append("pet_name", params.pet_name);
      formData.append("birthday", params.birthday);
      formData.append("type_pet", params.type_pet);
      formData.append("sex_pet", params.sex_pet);
      if (params.species) {
        formData.append("species", params.species);
      }
      formData.append("status", true);
      formData.append("created_by", params.created_by);
      if (params.profile) {
        formData.append("profile", params.profile);
      }
      let config = { headers: { Authorization: this.$auth.getToken('local'), 'Content-Type': 'multipart/form-data' } }
      const res = await this.$axios.$post(url, formData, config);
      commit('setLoading', false)
      return res
    } catch (error) {
      return error.response.data
    }
  },


  async update({ commit, dispatch }, params) {
    commit('setLoading', true)
    const url = routeAPI.pets.update;
    const formData = new FormData();
    formData.append("pet_id", params.pet_id);
    formData.append("member_id", params.member_id);
    formData.append("pet_name", params.pet_name);
    formData.append("birthday", params.birthday);
    formData.append("type_pet", params.type_pet);
    formData.append("sex_pet", params.sex_pet);
    if (params.species) {
      formData.append("species", params.species);
    }
    formData.append("status", true);
    formData.append("created_by", params.created_by);
    formData.append("created_date", params.created_date);
    formData.append("updated_by", params.updated_by);
    if (params.new_profile) {
      formData.append("profile", params.new_profile);
    }
    let config = { headers: { Authorization: this.$auth.getToken('local'), 'Content-Type': 'multipart/form-data' } }
    const res = await this.$axios.$put(url, formData, config);
    commit('setLoading', false)
    return res
  },

  async delete({ commit, dispatch }, { id }) {
    commit('setLoading', true)
    const url = routeAPI.pets.delete.replace('{:id}', id);
    let config = { headers: { Authorization: this.$auth.getToken('local') } }
    const res = await this.$axios.$delete(url, config);
    if (res.status == "ok") {
      await dispatch('loadData', { show_all: 'y', force_reload: true })
    }
    commit('setLoading', false)
    return res
  }

}