import axios from "axios";

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
    },
    async createSupplier({ dispatch, commit }, { name, phone }) {
      try {
        await axios
          .post("http://localhost:4040/supplier/create", {
            name: name,
            phone: phone
          })
          .then(async response => {
            this._vm.$toast.open("Поставщик успешно создан");
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
    async updateSupplier({ dispatch, commit }, { id, name, phone }) {
      try {
        await axios
            .post("http://localhost:4040/supplier/update", {
              id: id,
              name: name,
              phone: phone
            })
            .then(async response => {
              this._vm.$toast.open("Поставщик успешно обновлен");
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
