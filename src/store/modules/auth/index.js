import authActions from './actions.js';
import authMutations from './mutations.js';
import authGetters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    }
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters
}