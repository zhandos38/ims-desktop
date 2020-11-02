import axios from "axios";

export default {
  actions: {
    async login({ dispatch, commit }, { username, password, token }) {

      try {
        await axios
          .post("http://localhost:4040/user/login", {
            username: username,
            password: password,
            token: token
          })
          .then(function(response) {
            commit("setUser", response.data);
          })
          .catch(error => {
            this._vm.$toast.open("Неправильный ИИН/БИН или пароль");
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },
    logout({ commit }) {
      commit("unsetUser");
    }
  },
  mutations: {
    setUser(state, data) {
      state.user.id = data.id;
      state.user.username = data.username;

      localStorage.id = state.user.id;
      localStorage.username = state.user.username;
    },
    unsetUser(state) {
      localStorage.clear();
      state.user = {};
    }
  },
  state: {
    user: {
      id: null,
      username: null,
      full_name: null,
      role: null,
      status: null
    }
  },
  getters: {
    user: state => {
      if (!state.user.username || !state.user.id) {
        state.user.id = localStorage.id;
        state.user.username = localStorage.username;
      }

      return state.user;
    },
    isLoggedIn: state => {
      if (!state.user.id) {
        state.user.id = localStorage.id;
      }

      return state.user.id;
    }
  }
};
