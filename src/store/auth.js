import axios from "axios";

export default {
  actions: {
    async login({dispatch, commit}, {username, password}) {
      console.log(username, password)

      try {
        await axios.post('http://localhost:4040/user/login', {
          username: username,
          password: password
        })
        .then(function(response) {
          console.log(response)
          commit('setUser', response.data)
        })
        .catch(error => {
          this._vm.$toast.open('Неправильный ИИН/БИН или пароль')
          throw error
        })
      } catch (e) {
        throw e
      }
    },
    logout({commit}) {
      commit('unsetUser');
    }
  },
  mutations: {
    setUser(state, data) {
      state.user.username = data.username;
      state.user.balance = data.balance;

      localStorage.username = state.user.username;
      localStorage.balance = state.user.balance;
    },
    unsetUser(state) {
      state.user = {}
    }
  },
  state: {
    user: {
      username: null,
      bill: null
    }
  },
  getters: {
    user: state => {
      if (!state.user.username && !state.user.bill) {
        state.user.username = localStorage.username;
        state.user.balance = localStorage.balance;
      }

      return state.user
    }
  }
}
