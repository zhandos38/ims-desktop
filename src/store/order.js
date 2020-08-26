import axios from "axios";

export default {
  actions: {
    async fetchOrder({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/order/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createOrder({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/order/create", dataForm)
          .then(async response => {
            this._vm.$toast.open("Сотрудник успешно создан");
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
    async getOrder({ commit }, id) {
      try {
        await axios
          .get(`http://localhost:4040/order/get?id=${id}`)
          .then(async response => {
            commit("setOrder", response);
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
    order: null
  }
};
