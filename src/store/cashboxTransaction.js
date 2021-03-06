import axios from "axios";

export default {
  actions: {
    async fetchOrderReturn({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/order-return/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createOrderReturn({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/order-return/create", dataForm)
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
    async getOrderReturn({ commit }, id) {
      try {
        await axios
          .get(`http://localhost:4040/order-return/get?id=${id}`)
          .then(async response => {
            commit("setOrderReturn", response);
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
    setOrderReturn(state, data) {
      state.orderReturn = data;
    }
  },
  state: {
    dataProvider: null,
    orderReturn: null
  }
};
