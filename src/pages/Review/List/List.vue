<template>
  <q-page padding>
    <Header :title="title" class="q-mb-lg"/>

    <!-- <SearchBar :searchOptions="searchOptions" :searchValue="searchValue"
               :selectedOption="selectedOption"
               @optionChange="(targetOptionValue) => optionChange(targetOptionValue)"
               @searchInput="(targetInputValue) => this.searchValue=targetInputValue"
               @onClickSearch="onClickSearch"/> -->

    <Table title="" :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"/>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import Table from 'components/Table/Table';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';
import API from 'src/repositories/Review/ListAPI';

export default {
  name: 'ReviewList',

  components: {
    Table,
    Header,
    Confirm,
    Alert,
  },

  mixins: [rootStoreHelper],

  data () {
    return {
      title: '리뷰 탐색',

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
      columnLabels: ['번호', '아이디', '작성자 닉네임', '리뷰 점수', '리뷰 내용', '등록 일시'],
      columns: [],
      rows: [],
    };
  },

  created() {
    this.initColumns();
    this.initNormalList();
  },

  beforeMount () {
    const route = this.$route.query;
    this.selectedOption = this.searchOptions.find(opt => opt.value === route.opt);
    this.currentPage = parseInt(route.page);
    this.searchValue = this.$route.query.search;
  },

  watch: {
    '$route' () {
      this.initNormalList();
    },
  },

  methods: {
    initColumns() {
      this.columnLabels.forEach((label) => {
        const data = { label: label, align: 'center' };
        this.columns.push(data);
      });
    },

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
        data.forEach((item, idx) => {
          const row = {
            id: item.review_srl,
            no: idx,
            nick: item.user_nick_name,
            score: item.review_score,
            content: item.review_content,
            date: item.review_reg_date,
          };
          rows.push(row);
        });
      }

      this.rows = rows;
    },

    onClickSearch () {
      // const route = this.$route.query;
    },

    optionChange(targetOptionValue) {
      this.selectedOption = targetOptionValue;
      // const route = this.$route.query;
    },

    movePage (current) {
      if(this.$route.query.page !== current.toString()) {
        this.currentPage = current;
        // const route = this.$route.query;
      }
    },

    setRowsPerPage (targetSize) {
      this.paginationOptions.rowsPerPage = targetSize;
      // const route = this.$route.query;
    },

    setSortOption(targetSort) {
      this.sortOption = targetSort;
    },

    closeConfirm() {
      this.isConfirm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
