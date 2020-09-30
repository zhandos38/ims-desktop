export default {
  install(Vue, options) {
    Vue.prototype.$formatter = {
      date: function(unixTime) {
        const today = new Date(unixTime);
        const date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        return date + " " + time;
      }
    };
  }
};
