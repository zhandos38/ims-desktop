import axios from "axios";

export default {
  actions: {
    async fetchCustomers({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/customer/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async getCustomers({ commit }) {
      const data = await (
        await fetch(`http://localhost:4040/customer/list`)
      ).json();

      commit("setList", data);
    },
    async createCustomer({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/customer/create", dataForm)
          .then(async response => {
            this._vm.$toast.open("Клиент успешно создан");
          })
          .catch(error => {
            this._vm.$toast.open(
              "Произошло ошибка, обратитесь в службу поддержки"
            );
            throw error;
          });
      } catch (e) {
        throw e;
      }
    },
    async updateCustomer({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/customer/update", dataForm)
          .then(async response => {
            this._vm.$toast.open("Клиент успешно обновлен");
          })
          .catch(error => {
            this._vm.$toast.open(
              "Произошло ошибка, обратитесь в службу поддержки"
            );
            throw error;
          });
      } catch (e) {
        throw e;
      }
    }
  },
  mutations: {
    setDataProvider(state, data) {
      state.dataProvider = data;
    },
    setList(state, list) {
      state.list = list;
    }
  },
  state: {
    dataProvider: null,
    list: null
  }
};
