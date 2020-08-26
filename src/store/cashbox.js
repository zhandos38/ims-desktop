import axios from "axios";

export default {
  actions: {
    async fetchCashbox({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/cashbox/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createCashbox({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/cashbox/create", dataForm)
          .then(async response => {
            this._vm.$toast.open("Касса успешно создана");
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
    async getCashbox({ commit }, id) {
      try {
        await axios
          .get(`http://localhost:4040/order/get?id=${id}`)
          .then(async response => {
            commit("setCashbox", response);
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
    setOrder(state, data) {
      state.order = data;
    }
  },
  state: {
    dataProvider: null,
    cashbox: null
  }
};
