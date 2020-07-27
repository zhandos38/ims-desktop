export default {
  actions: {
    async fetchSuppliers({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/supplier/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async getSuppliers({ commit }) {
      const data = await (
        await fetch(`http://localhost:4040/supplier/list`)
      ).json();

      commit("setList", data);
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
