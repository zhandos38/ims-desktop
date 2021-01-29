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
    },
    async updateExpireDate({ commit }, { token }) {
      try {
        await axios
          .get(
            `http://localhost:4040/settings/update-expire-date?token=${token}`
          )
          .then(async response => {
            commit("setExpireDate", response);
            this._vm.$toast.open("Срок лицензии успешно обновлен");
          })
          .catch(error => {
            this._vm.$toast.error(
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
    },
    setExpireDate(state, data) {
      state.list.expire_date = data;
    }
  },
  state: {
    dataProvider: null,
    list: null
  },
  getters: {
    getObjectName(state) {
      return state.list.name || localStorage.name;
    },
    getExpireDate(state) {
      return state.list.expire_date || localStorage.expire_date;
    },
    token(state) {
      return state.list.token || localStorage.token;
    }
  }
};
