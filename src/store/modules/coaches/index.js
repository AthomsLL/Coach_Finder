import coachesActions from './actions.js';
import coachesMutations from './mutations.js';
import coachesGetters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [],
    }
  },
  mutations: coachesMutations,
  actions: coachesActions,
  getters: coachesGetters,
}