import axios from "axios";

export default {
  actions: {
    async fetchSettings({ commit }, { page = 0, pageSize = 20 }) {
      const data = await (
        await fetch(
          `http://localhost:4040/settings/?page=${page}&size=${pageSize}`
        )
      ).json();

      commit("setDataProvider", data);
    },
    async getSettings({ commit }) {
      const data = await (
        await fetch(`http://localhost:4040/settings/all`)
      ).json();

      commit("setSettings", data);
    },
    async createSettings({ commit }, { name, value }) {
      try {
        await axios
          .post("http://localhost:4040/settings/create", {
            name: name,
            value: value
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
    async updateSettings({ commit }, { id, name, phone }) {
      try {
        await axios
          .post("http://localhost:4040/settings/update", {
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
    setSettings(state, list) {
      let arrayList = [];
      for (const item of list) {
        arrayList[item.name] = item.value;
        localStorage[item.name] = item.value;
      }

      state.list = arrayList;
    }
  },
  state: {
    dataProvider: null,
    list: null
  },
  getters: {
    getObjectName() {
      return localStorage.name;
    },
    getExpireDate() {
      return localStorage.expire_date;
    }
  }
};
