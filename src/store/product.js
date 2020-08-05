import axios from "axios";

export default {
  actions: {
    async fetchProducts({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/product/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async getProducts({ commit }) {
      const data = await (
        await fetch(`http://localhost:4040/product/list`)
      ).json();

      commit("setList", data);
    },
    async createProduct({ commit }, { ...dataForm }) {
      try {
        await axios
          .post("http://localhost:4040/product/create", { ...dataForm })
          .then(async response => {
            this._vm.$toast.open("Товар успешно создан");
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
    },
    async getProductsByBarcode({ commit }, { term }) {
      try {
        const data = await (
          await fetch(
            `http://localhost:4040/product/search-by-barcode?term=${term}`
          )
        ).json();

        commit("setSuggestByBarcode", data);
      } catch (e) {
        this._vm.$toast.open("Произошло ошибка, обратитесь в службу поддержки");
        throw e;
      }
    },
    async getProductsByName({ commit }, { term }) {
      try {
        const data = await (
          await fetch(
            `http://localhost:4040/product/search-by-name?term=${term}`
          )
        ).json();

        commit("setSuggestByBarcode", data);
      } catch (e) {
        this._vm.$toast.open("Произошло ошибка, обратитесь в службу поддержки");
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
    },
    setSuggestByBarcode(state, data) {
      state.suggestByBarcode = data;
    },
    setSuggestByName(state, data) {
      state.suggestByName = data;
    }
  },
  state: {
    dataProvider: null,
    list: null,
    suggestByBarcode: null,
    suggestByName: null
  }
};
