import axios from "axios";

export default {
  actions: {
    async fetchInvoices({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/invoice/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createInvoice({ commit }, { invoice, invoiceItems }) {
      try {
        await axios
          .post("http://localhost:4040/invoice/create", {
            invoice,
            invoiceItems
          })
          .then(response => {
            this._vm.$toast.open("Накалдной успешно создан");
          })
          .catch(error => {
            this._vm.$toast.error(
              "Произошла ошибка, обратитесь в службу поддержки"
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
    }
  },
  state: {
    dataProvider: null
  }
};
