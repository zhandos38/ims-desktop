export default {
  actions: {
    async fetchInvoices({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/invoice/?page=${page}&size=${pageSize}`
        )
      ).json();
      console.log(data);

      commit("setDataProvider", data);
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
