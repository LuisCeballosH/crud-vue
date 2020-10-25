import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titleState: "test",
    tareasState: [],
    nuevaTareaState: "",
  },
  mutations: {
    agregarMutations(state) {
      state.tareasState.push({
        name: state.nuevaTareaState,
        state: true,
      });
      state.nuevaTareaState = "";
      localStorage.setItem("data", JSON.stringify(state.tareasState));
    },
    editarMutations(state, index) {
      state.tareasState[index].state = !state.tareasState[index].state;
      localStorage.setItem("data", JSON.stringify(state.tareasState));
    },
    eliminarMutations(state, index) {
      state.tareasState.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(state.tareasState));
    },
    loadData(state, actionData) {
      console.log(actionData);
      state.tareasState = actionData || [];
    }
  },
  actions: {
    getData({ commit }) {
      console.log('test');
      let datos = JSON.parse(localStorage.getItem("data"));
      commit('loadData', datos);
    }
  },
  modules: {
  }
})
