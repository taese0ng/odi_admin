<template>
  <q-page padding>
    <Header :title="title"/>

    <SearchBar :searchOptions="searchOptions" :searchValue="searchValue"
               :selectedOption="selectedOption"
               @optionChange="(targetOptionValue) => optionChange(targetOptionValue)"
               @searchInput="(targetInputValue) => this.searchValue=targetInputValue"
               @onClickSearch="onClickSearch"/>

    <SearchResult :searchResultCount="allCount"
                  :size="paginationOptions.rowsPerPage"
                  :sortOptions="sortOptions"
                  :sortOption="sortOption"
                  @selectedSort="(targetSort) => setSortOption(targetSort)"
                  @selectedSize="(targetSize) => setRowsPerPage(targetSize)"/>

    <Table title="" unlockBtn withdrawalBtn :rows="rows" :columns="columns" :selectedItems="selectedItems"
           @selection="(targetSelectedItems) => this.selectedItems = targetSelectedItems"
           :paginationOptions="paginationOptions" @onClickUnlock="onClickUnlock"
           @onClickWithdrawal="onClickWithdrawal"/>

    <div class="row justify-start q-my-lg">
      <q-btn class="btn-sm" no-caps color="green-9" label="Excel 저장" :disable="selectedItems.length===0"/>
      <q-btn class="q-mx-sm btn-sm" no-caps color="blue-grey-9" label="일괄 탈퇴" :disable="selectedItems.length===0"/>
    </div>

    <div class="row justify-center">
      <Pagination :itemLength="allCount"
                  :rowsPerPage="paginationOptions.rowsPerPage"
                  :maxPages="5" :movePage="movePage" :current="currentPage"/>
    </div>

    <Confirm v-if="isConfirm" :msg="msg" :confirmMethod="confirmMethod" @closeConfirm="closeConfirm"/>
    <Alert v-if="isAlert" :msg="msg" @closeAlert="isAlert = false"/>
  </q-page>
</template>

<script>
import Header from 'components/Header/Header';
import SearchBar from 'components/SearchBar/SearchBar';
import Table from 'components/Table/MemberTable';
import SearchResult from 'components/SearchResult/SearchResult';
import Pagination from 'components/Pagination/Pagination';
import Confirm from 'components/Confirm/Confirm';
import Alert from 'components/Alert/Alert';

export default {
  name: 'DormantList',

  components: {
    Table,
    SearchBar,
    Header,
    SearchResult,
    Pagination,
    Confirm,
    Alert,
  },

  data () {
    return {
      title: '휴면회원',
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
      paginationOptions: {
        rowsPerPage: 10,
      },
      sortOptions: ['휴면일', '가입일', '최근로그인'],
      sortOption: '휴면일',

      selectedItems: [],
      columnLabels: ['번호', '이메일', '회원명', '휴대전화', '가입일', '최근로그인 일시', '휴면처리 일시', '처리'],
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
    this.paginationOptions.rowsPerPage = parseInt(route.size);
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
      for(let i = 0; i < 10; i++) {
        const data = {
          id: i + 1,
          no: i + 1,
          email: 'tskim@hnmcorp.kr',
          name: `${i + 1}번째사람`,
          phone: '010-1234-5678',
          signUpDate: '2020.10.29',
          recentLogin: '2020.10.29 12:34:56',
          sleepDate: '2020.12.20 12:34:56',
        };
        rows.push(data);
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

    onClickUnlock (targetRow) {
      console.log(targetRow);
      this.msg = '철회하시겠습니까?';
      this.confirmMethod = this.unlockUser;
      this.isConfirm = true;
    },

    onClickWithdrawal(targetRow) {
      console.log(targetRow);
      this.msg = '탈퇴시키겠습니까?';
      this.confirmMethod = this.withdrawalUser;
      this.isConfirm = true;
    },

    closeConfirm() {
      this.isConfirm = false;
    },

    unlockUser() {
      console.log('unlockUser');
    },

    withdrawalUser() {
      console.log('user withdrawalUser');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
