<template>
    <q-page padding>
      <Header :title="title"/>

      <q-card flat bordered class="q-mt-md q-mx-auto">
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              카페 노출수 카운트
            </div>
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              {{exposure}}
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              카페 조회수
            </div>
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              {{view}}
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              카페 좋아요 수
            </div>
            <div class="col-12 col-sm-6 text-h5 text-bold q-mb-lg">
              {{like}}
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 text-h5 text-bold q-mb-lg">카페 조회 회원의 성별, 나이</div>
            <div class="col-12">
              <div class='row'>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="genderOfViewer.chartData" 
                    :options="genderOfViewer.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="ageOfViewer.chartData" 
                    :options="ageOfViewer.options"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 text-h5 text-bold q-mb-lg">좋아요 누른 회원의 성별, 나이</div>
            <div class="col-12">
              <div class='row'>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="genderOfViewer.chartData" 
                    :options="genderOfViewer.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="ageOfViewer.chartData" 
                    :options="ageOfViewer.options"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 text-h5 text-bold q-mb-lg">쿠폰 사용 회원의 성별, 나이</div>
            <div class="col-12">
              <div class='row'>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="genderOfViewer.chartData" 
                    :options="genderOfViewer.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <PieChart :chartData="ageOfViewer.chartData" 
                    :options="ageOfViewer.options"/>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import PieChart from 'components/Charts/Pie';
import API from 'src/repositories/CafeInfo/StatisticsAPI';

export default {
  name: 'CafeStatistics',
  components: {
    Header,
    PieChart,
  },

  mixins: [rootStoreHelper],

  data() {
    return {
      title: '카페 관련 통계',
      exposure: 100,
      view: 100,
      like: 100,

      genderOfViewer: {
        chartData: {
          labels: ['남', '여'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            data: [1000, 500],
          }],
        },

        options: {
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      },

      ageOfViewer: {
        chartData: {
          labels: ['10대', '20대', '30대', '40대', '기타'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',     
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rightGrey',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',   
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rightGrey',
            ],
            data: [1000, 500, 300, 200, 800],
          }],
        },

        options: {
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      },
    };
  },

  created() {
    this.getStatistics();
  },

  methods: {
    async getStatistics() {
      const body = {
        cafe_srl: this.getCafeSrl,
      };
      const apiResult = await API.getStatistics(body);

      console.log(apiResult);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        const data = apiResult.data[0];
        this.exposure = data.cafe_watch_views;
        this.view = data.cafe_views;
        this.like = data.cafe_like;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
