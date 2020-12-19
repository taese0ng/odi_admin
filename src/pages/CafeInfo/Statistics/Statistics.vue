<template>
    <q-page padding>
      <Header :title="title"/>

      <q-card flat bordered class="q-mt-md q-mx-auto">
        <div class="row justify-center q-ma-xl" v-if="loading">
          <q-spinner
            color="primary"
            size="3em"
          />
        </div>
        <q-card-section v-else>
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
                  <DoughnutChart :chartData="genderOfViewer.chartData" 
                    :options="genderOfViewer.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <DoughnutChart :chartData="ageOfViewer.chartData" 
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
                  <DoughnutChart :chartData="genderOfLiker.chartData"
                    :options="genderOfLiker.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <DoughnutChart :chartData="ageOfLiker.chartData" 
                    :options="ageOfLiker.options"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mb-md">
            <div class="col-12 text-h5 text-bold q-mb-lg">쿠폰 사용 회원의 성별, 나이</div>
            <div class="col-12">
              <div class='row'>
                <div class='col-12 col-md-6 q-pa-md'>
                  <DoughnutChart :chartData="genderOfCoupon.chartData" 
                    :options="genderOfCoupon.options"/>
                </div>
                <div class='col-12 col-md-6 q-pa-md'>
                  <DoughnutChart :chartData="ageOfCoupon.chartData" 
                    :options="ageOfCoupon.options"/>
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
import DoughnutChart from 'components/Charts/Doughnut.js';
import API from 'src/repositories/CafeInfo/StatisticsAPI';

export default {
  name: 'CafeStatistics',
  components: {
    Header,
    DoughnutChart,
  },

  mixins: [rootStoreHelper],

  data() {
    return {
      title: '카페 관련 통계',
      loading: true,
      isLike: false,
      isCoupon: false,
      isView: false,

      exposure: 100,
      view: 100,
      like: 100,

      genderOfViewer: {
        chartData: {
          labels: ['남', '여'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)',
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
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
              'rgba(153, 102, 255, 1)',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',   
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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

      genderOfLiker: {
        chartData: {
          labels: ['남', '여'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)',
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            data: [0, 0],
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

      ageOfLiker: {
        chartData: {
          labels: ['10대', '20대', '30대', '40대', '기타'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',     
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',   
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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

      genderOfCoupon: {
        chartData: {
          labels: ['남', '여'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)',
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            data: [0, 0],
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

      ageOfCoupon: {
        chartData: {
          labels: ['10대', '20대', '30대', '40대', '기타'],
          datasets: [{
            borderWidth: 1,
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',     
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',   
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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
    endLoading() {
      if(this.isLike && this.isCoupon && this.isView) {
        this.loading = false;
      }
    },

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
        this.makeLikeGraph(data.like_gender_age);
        this.makeViewGraph(data.view_gender_age);
        this.makeCouponGraph(data.coupon_gender_age);
      }

      this.endLoading();
    },

    makeLikeGraph(data) {
      let male = 0;
      let female = 0;
      let teenage = 0;
      let twenties = 0;
      let thirties = 0;
      let forties = 0;
      let etc = 0;
      data.forEach(item => {
        switch(item.gender) {
          case '남':
            male++;
            break;
          case '여':
            female++;
            break;
        }
        switch(true) {
          case (item.age >= 10 && item.age < 20):
            teenage++;
            break;
          case (item.age < 30):
            twenties++;
            break;
          case (item.age < 40):
            thirties++;
            break;
          case (item.age < 50):
            forties++;
            break;
          default:
            etc++;
        }
      });

      const ageArr = [teenage, twenties, thirties, forties, etc];
      this.genderOfLiker.chartData.datasets[0].data[0] = male;
      this.genderOfLiker.chartData.datasets[0].data[1] = female;
      this.ageOfLiker.chartData.datasets[0].data = ageArr;

      this.isLike = true;
      this.endLoading();
    },

    makeViewGraph(data) {
      let male = 0;
      let female = 0;
      let teenage = 0;
      let twenties = 0;
      let thirties = 0;
      let forties = 0;
      let etc = 0;
      data.forEach(item => {
        switch(item.gender) {
          case '남':
            male++;
            break;
          case '여':
            female++;
            break;
        }
        switch(true) {
          case (item.age >= 10 && item.age < 20):
            teenage++;
            break;
          case (item.age < 30):
            twenties++;
            break;
          case (item.age < 40):
            thirties++;
            break;
          case (item.age < 50):
            forties++;
            break;
          default:
            etc++;
        }
      });

      const ageArr = [teenage, twenties, thirties, forties, etc];

      this.genderOfViewer.chartData.datasets[0].data[0] = male;
      this.genderOfViewer.chartData.datasets[0].data[1] = female;
      this.ageOfViewer.chartData.datasets[0].data = ageArr;
      
      this.isView = true;
      this.endLoading();
    },

    makeCouponGraph(data) {
      let male = 0;
      let female = 0;
      let teenage = 0;
      let twenties = 0;
      let thirties = 0;
      let forties = 0;
      let etc = 0;
      data.forEach(item => {
        switch(item.gender) {
          case '남':
            male++;
            break;
          case '여':
            female++;
            break;
        }
        switch(true) {
          case (item.age >= 10 && item.age < 20):
            teenage++;
            break;
          case (item.age < 30):
            twenties++;
            break;
          case (item.age < 40):
            thirties++;
            break;
          case (item.age < 50):
            forties++;
            break;
          default:
            etc++;
        }
      });

      const ageArr = [teenage, twenties, thirties, forties, etc];
      this.genderOfCoupon.chartData.datasets[0].data[0] = male;
      this.genderOfCoupon.chartData.datasets[0].data[1] = female;
      this.ageOfCoupon.chartData.datasets[0].data = ageArr;

      this.isCoupon = true;
      this.endLoading();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
