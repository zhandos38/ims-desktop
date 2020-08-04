import axios from "axios";

export default {
  actions: {
    async fetchCategories({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/category/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async getCategories({ commit }) {
      const data = await (
        await fetch(`http://localhost:4040/category/list`)
      ).json();

      commit("setList", data);
    },
    async createCategory({ dispatch, commit }, { name, color }) {
      try {
        await axios
          .post("http://localhost:4040/category/create", {
            name: name,
            color: color
          })
          .then(async response => {
            this._vm.$toast.open("Поставщик успешно создан");
            await dispatch("getSuppliers");
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
