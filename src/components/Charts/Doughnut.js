
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],

  mounted () {
    this.render();
  },

  methods: {
    render() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
