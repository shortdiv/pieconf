import Vue from "vue";
import Vuex from "vuex";
import netlifyIdentity from "netlify-identity-widget";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isWidgetOpen: false
  },
  mutations: {
    TOGGLE_WIDGET(state) {
      state.isWidgetOpen = !state.isWidgetOpen;
    }
  },
  actions: {
    initializeIdentity({ commit }, container) {
      netlifyIdentity.init({
        container
      });
      netlifyIdentity.open("signup");
      commit("TOGGLE_WIDGET");
      netlifyIdentity.on("close", () => {
        commit("TOGGLE_WIDGET");
      });
    },
    openWidget() {
      netlifyIdentity.open("login");
    }
  }
});
