<template>
    <q-page padding>
      <Header :title="title"/>

      <q-card flat bordered class="q-mt-md q-mx-auto">
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-12">
              <div class='text-h5 text-bold q-mb-lg'>카페 조회 회원의 성별 나이</div>
              <div class='row justify-around'>
                <PieChart :chartData="genderOfViewer.chartData" 
                  :options="genderOfViewer.options"/>
                <PieChart :chartData="ageOfViewer.chartData" 
                  :options="ageOfViewer.options"/>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import PieChart from 'components/Charts/Pie';

export default {
  name: 'CafeStatistics',
  components: {
    Header,
    PieChart,
  },

  data() {
    return {
      title: '카페 관련 통계',

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
};
</script>

<style lang="scss" scoped>

</style>
