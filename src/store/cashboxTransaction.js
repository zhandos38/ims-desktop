import axios from "axios";

export default {
  actions: {
    async fetchCashboxTransactions({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/cashbox-transactions/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createCashboxTransactions({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/cashbox-transactions/create", dataForm)
          .then(async response => {
            this._vm.$toast.open("Смена успешно открыта");
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
    async getCashboxTransactions({ commit }, id) {
      try {
        await axios
          .get(`http://localhost:4040/cashbox-transactions/get?id=${id}`)
          .then(async response => {
            commit("setCashboxTransaction", response);
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
    setShift(state, data) {
      state.shift = data;
    }
  },
  state: {
    dataProvider: null,
    shift: null
  }
};
