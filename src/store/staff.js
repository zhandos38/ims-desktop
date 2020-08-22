import axios from "axios";

export default {
  actions: {
    async fetchStaff({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/user/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async createStaff({ dispatch, commit }, dataForm) {
      try {
        await axios
          .post("http://localhost:4040/user/create", dataForm)
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
    async updateStaff({ dispatch, commit }, dataForm) {
      try {
        await axios
            .post("http://localhost:4040/user/update", dataForm)
            .then(async response => {
              this._vm.$toast.open("Сотрудник успешно обновлен");
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
