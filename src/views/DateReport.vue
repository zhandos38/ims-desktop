<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-container" v-else>
      <div class="app-container__header">
        <router-link class="btn btn-outline-danger" to="/report"
          ><i class="fa fa-arrow-left"></i> Назад</router-link
        >
      </div>
      <h2>Отчет по складу</h2>
      <div class="app-container__body">
        <div class="row">
          <date-range-picker
            v-model="dateRange"
            :locale-data="localData"
            :ranges="ranges"
            @update="setChart"
            :time-picker="true"
          >
            <template v-slot:input="dateRange">
              <div class="daterangepicker-input">
                {{ dateRange.startDate | date }} -
                {{ dateRange.endDate | date }}
              </div>
            </template>
            <template #ranges="ranges">
              <div class="ranges">
                <ul>
                  <li
                    v-for="(range, name) in ranges.ranges"
                    :key="name"
                    @click="ranges.clickRange(range)"
                  >
                    <b>{{ name }}</b
                    ><br />
                    <small class="text-muted"
                      >{{ range[0].toLocaleDateString() }} -
                      {{ range[1].toLocaleDateString() }}</small
                    >
                  </li>
                </ul>
              </div>
            </template>
          </date-range-picker>
        </div>
        <div class="row">
          <div class="col-md-12">
            <chart
              :chart-data="dataCollection"
              :options="{
                responsive: true,
                maintainAspectRatio: false
              }"
            ></chart>
            <table class="table table-bordered" v-if="groupedOrders.length > 0">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Количество</th>
                  <th>Сумма</th>
                  <th>Средний чек</th>
                  <th>Наличные</th>
                  <th>Безналичные</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) of groupedOrders" v-bind:key="key">
                  <td>{{ item.date }}</td>
                  <td>{{ item.sum }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.sum / item.qty | number }}</td>
                  <td>{{ item.takenCash }}</td>
                  <td>{{ item.takenCard }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import Chart from "../components/app/Chart";

export default {
  name: "DateReport",
  data: () => ({
    loading: false,
    dataCollection: {},
    dateRange: {
      startDate: new Date().setHours(0, 0, 0, 0),
      endDate: new Date().setHours(0, 0, 0, 0)
    },
    localData: {
      direction: "ltr",
      format: "mm.dd.yyyy",
      separator: " - ",
      applyLabel: "Применить",
      cancelLabel: "Отменить",
      weekLabel: "W",
      customRangeLabel: "Custom Range",
      daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      firstDay: 0
    },
    ranges: null,
    groupedOrders: []
  }),
  components: {
    DateRangePicker,
    Chart
  },
  methods: {
    async setChart(dateRange) {
      const data = await (
        await fetch(
          `http://localhost:4040/order/get-by-date?startDate=${dateRange.startDate.getTime() /
            1000}&endDate=${dateRange.endDate.getTime() / 1000}`
        )
      ).json();

      if (data.length === 0) {
        this.$toast.open("Ничего не найдено");
        return;
      }

      let orders = data.map(function(item) {
        let date = new Date(item.created_at * 1000);
        return {
          ...item,
          date:
            date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
        };
      });

      function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
          const key = obj[property];

          const quantity = obj.OrderItems.reduce((acc, item) => {
            return acc + parseFloat(item.quantity);
          }, 0);

          if (!acc[key]) {
            acc[key] = {
              date: key,
              sum: parseFloat(obj.cost_total),
              qty: parseFloat(quantity),
              takenCash: parseFloat(obj.cash_amount),
              takenCard: parseFloat(obj.card_amount)
            };
          }
          // Add object to list for given key's value
          acc[key].sum += parseFloat(obj.cost_total);
          acc[key].qty += parseFloat(quantity);
          acc[key].takenCash += parseFloat(obj.cash_amount);
          acc[key].takenCard += parseFloat(obj.card_amount);
          return acc;
        }, {});
      }

      this.groupedOrders = groupBy(orders, "date");
      let dateArray = Object.keys(this.groupedOrders);
      this.groupedOrders = Object.values(this.groupedOrders);

      let totalSum = this.groupedOrders.map(item => {
        return item.sum;
      });

      let totalQuantity = this.groupedOrders.map(item => {
        return item.qty;
      });

      let totalAvg = this.groupedOrders.map(item => {
        return item.sum / item.qty;
      });

      let totalTakenCash = this.groupedOrders.map(item => {
        return item.takenCash;
      });

      let totalTakenCard = this.groupedOrders.map(item => {
        return item.takenCard;
      });

      this.dataCollection = {
        labels: dateArray,
        datasets: [
          {
            label: "Сумма",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: totalSum
          },
          {
            label: "Количество",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: totalQuantity
          },
          {
            label: "Средний чек",
            backgroundColor: "rgba(241, 247, 45, 0.2)",
            borderColor: "rgba(241, 247, 45, 1)",
            pointBackgroundColor: "rgba(241, 247, 45, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(241, 247, 45, 1)",
            data: totalAvg
          },
          {
            label: "Наличные",
            backgroundColor: "rgba(18, 227, 84,0.2)",
            borderColor: "rgba(18, 227, 84,1)",
            pointBackgroundColor: "rgba(18, 227, 84,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(18, 227, 84,1)",
            data: totalTakenCash
          },
          {
            label: "Безналичные",
            backgroundColor: "rgba(3, 252, 219,0.2)",
            borderColor: "rgba(3, 252, 219,1)",
            pointBackgroundColor: "rgba(3, 252, 219,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(3, 252, 219,1)",
            data: totalTakenCard
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  mounted() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    let date = new Date();
    let thisMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);

    this.ranges = {
      Сегодня: [today, today],
      Вчера: [yesterday, yesterday],
      "Ткущий месяц": [thisMonthStart, today],
      "Прошлый месяц": [
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        new Date(today.getFullYear(), today.getMonth(), 0)
      ],
      "Текущий год": [
        new Date(today.getFullYear(), 0, 1),
        new Date(today.getFullYear(), 11, 31)
      ]
    };
  }
};
</script>

<style scoped>
.vue-daterange-picker {
  color: #000 !important;
}
.daterangepicker-input {
  color: #000;
  text-align: center;
  padding-top: 5px;
}
</style>
