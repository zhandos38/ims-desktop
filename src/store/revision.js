import axios from "axios";

export default {
  actions: {
    async fetchRevisions({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/revision/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createRevision({ commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/revision/create", dataForm)
          .then(response => {
            this._vm.$toast.open("Ревизия успешно сохранена");
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
