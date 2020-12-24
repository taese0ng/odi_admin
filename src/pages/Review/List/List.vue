<template>
  <q-page padding>
    <Header :title="title" class="q-mb-lg"/>

    <!-- <Table title="" :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"/> -->
    <div class="row justify-center q-ma-xl" v-if="loading">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>
    <div class="maxContainer-md q-mx-auto">
      <template v-for='item in rows'>
        <Card :key="item.id" :data="item" mode='review' class='q-my-md'/>
      </template>
    </div>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import API from 'src/repositories/Review/ListAPI';
import Card from 'components/Card/Card';

export default {
  name: 'ReviewList',

  components: {
    Header,
    Confirm,
    Alert,
    Card,
  },

  mixins: [rootStoreHelper],

  data () {
    return {
      title: '리뷰 탐색',
      loading: true,

      isConfirm: false,
      isAlert: false,
      msg: '',
      confirmMethod: null,
      allCount: 10,
      currentPage: 1,
      searchValue: '',
      selectedOption: '',
      searchOptions: [
        { label: '회원명', value: 'name' },
        { label: '이메일', value: 'email' },
        { label: '휴대전화', value: 'phone' },
      ],

      sortOptions: ['가입일', '이름순', '최근로그인'],
      sortOption: '가입일',

      selectedItems: [],
      columnLabels: ['번호', '작성자 닉네임', '리뷰 점수', '리뷰 내용', '등록 일시'],
      columns: [],
      rows: [],
    };
  },

  created() {
    // this.initColumns();
    this.initNormalList();
  },

  methods: {
    // initColumns() {
    //   this.columnLabels.forEach((label) => {
    //     const data = { label: label, align: 'center' };
    //     this.columns.push(data);
    //   });
    // },

    async initNormalList() {
      // const route = this.$route.query;
      const rows = [];

      const body = {
        cafe_srl: this.getCafeSrl,
      };
      const apiResult = await API.getReviewList(body);
      console.log(apiResult);
      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        const data = apiResult.data;
        data.forEach((item) => {
          const row = {
            srl: item.review_srl,
            nick: item.user_nick_name,
            score: item.review_score,
            content: item.review_content,
            date: item.review_reg_date,
            imgCount: item.review_image_count,
          };
          rows.push(row);
        });

        this.rows = rows;
        this.loading = false;
      } else {
        console.log(apiResult.response);
      }
    },

    closeConfirm() {
      this.isConfirm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
